import { App } from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { ParalusAddOn } from '@paralus/paralus-eks-blueprints-addon';

const app = new App();

blueprints.EksBlueprint.builder()
     .addOns(new ParalusAddOn({
         namespace: 'paralus-namespace',
         /**
         * Values to pass to the chart as per https://github.com/paralus/helm-charts/blob/main/charts/ztka/values.yaml.
         */
         // update this to your domain, as paralus works based on domain based routing
         values: {
            "fqdn.domain": "paralus.local"
         }
     }))
     .build(app, 'paralus-test-blueprint');