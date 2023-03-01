import * as blueprints from '@aws-quickstart/eks-blueprints';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Configuration options for add-on.
 */
 export interface ParalusAddOnProps extends blueprints.addons.HelmAddOnUserProps {
    /**
     * Namespace where add-on will be deployed. 
     * @default paralus-system
     */
    namespace?: string;

    /**
    * Helm chart version to use to install.
    * @default 0.2.0
    */
    version?: string;

    /**
    * Is this a development environment
    * @default true
    */
    development?: boolean

}

/**
 * Defaults options for the add-on
 */
export const defaultProps: blueprints.addons.HelmAddOnProps & ParalusAddOnProps = {
    namespace: "paralus-system",
    version: '0.2.0',
    chart: "ztka",
    release: "blueprints-addon-paralus",
    repository: "https://paralus.github.io/helm-charts",
    name: 'my-ztka',
    development: true,
    /**
     * Values to pass to the chart as per https://github.com/paralus/helm-charts/blob/main/charts/ztka/values.yaml.
     */
    values: {}
};

/**
 * Implementation of paralus add-on and post deployment hook.
 */
 export class ParalusAddOn extends blueprints.addons.HelmAddOn {

    readonly options: ParalusAddOnProps;

    constructor(props: ParalusAddOnProps) {
        super({...defaultProps, ...props});
        this.options = this.props as ParalusAddOnProps;
    }

    /**
     * Implementation of the add-on contract deploy method.
    */
    deploy(clusterInfo: blueprints.ClusterInfo): Promise<Construct> {
        
        const ns = blueprints.utils.createNamespace(this.props.namespace!, clusterInfo.cluster, true);

        const serviceAccountName = 'paralus-controller-sa';
        const sa = clusterInfo.cluster.addServiceAccount('aws-for-paralus-sa', {
            name: serviceAccountName,
            namespace: this.props.namespace
        });

        sa.node.addDependency(ns); // signal provisioning to wait for namespace creation to complete 
                                   // before the service account creation is attempted (otherwise can fire in parallel)

        // Cloud Map Full Access policy.
        const cloudWatchAgentPolicy = ManagedPolicy.fromAwsManagedPolicyName("CloudWatchAgentServerPolicy");
        sa.role.addManagedPolicy(cloudWatchAgentPolicy);

        // Configure values.
        const values: blueprints.Values = {
            serviceAccount: {
                name: serviceAccountName,
                create: false
            },
            deploy: {
                postgresql: {
                    enable: this.options.development
                }
            },
            kratos: {
                kratos: {
                    development: this.options.development
                }
            },
            ...this.options.values
        };

        const chart = this.addHelmChart(clusterInfo, values);
        chart.node.addDependency(sa);

        return Promise.resolve(chart);
    }

}