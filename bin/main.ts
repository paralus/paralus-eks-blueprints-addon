import { App } from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { ParalusAddOn } from '../dist';

const app = new App();

blueprints.EksBlueprint.builder()
     .addOns(
        new blueprints.AwsLoadBalancerControllerAddOn(),
        new blueprints.VpcCniAddOn(),
        new blueprints.KubeProxyAddOn(),
        new blueprints.EbsCsiDriverAddOn(),
        new blueprints.CertManagerAddOn(),
        new ParalusAddOn({
         namespace: 'paralus-system',
         /**
         * Values to pass to the chart as per https://github.com/paralus/helm-charts/blob/main/charts/ztka/values.yaml.
         */
         // update this to your domain, as paralus works based on domain based routing
         values: {
            "fqdn.domain": "paralus.local"
         }
     }))
     .teams()
     .build(app, 'paralus-test-blueprint');