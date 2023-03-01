# Using the Paralus Addon in your EKS Blueprints for CDK

Before you can use the Paralus Addon in your EKS Blueprints for CDK implementation, please follow the instructions in the [AWS Quickstart Repo](https://github.com/aws-quickstart/cdk-eks-blueprints) to initialize your CDK project and include the `cdk-eks-blueprint` dependency.

Add the `@paralus/paralus-eks-blueprints-addon` package to your project and save it in your `package.json` file by running the following command:

```shell
npm install @paralus/paralus-eks-blueprints-addon
```

Import the addon in your `bin/<your-main-file>.ts` file and create an EKS blueprint with ParalusAddOn

```typescript
import { ParalusAddOn } from '@paralus/paralus-eks-blueprints-addon';

const app = new cdk.App();

// AddOns for the cluster.
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
```
This is all you need to do to have Paralus automatically installed as part of your EKS Blueprints for CDK.