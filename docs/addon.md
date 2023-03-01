# Paralus AddOn for EKS Blueprints for CDK Reference Architecture

This Addon deploys Paralus - a free, open source tool that enables controlled, audited access to Kubernetes infrastructure. It comes with just-in-time service account creation and user-level credential management that integrates with your RBAC and SSO. This addon deploys paralus core controller on your Amazon Elastic Kubernetes Service (Amazon EKS).

## What does Paralus addon look like?

The addon itself is a typescript [package hosted in npm](https://www.npmjs.com/package/@paralus/paralus-eks-blueprints-addon).

You can install it using `npm` and use it in your implementation of the EKS Blueprints for CDK .

## Prerequisites to use the Paralus addon for EKS Blueprints for CDK:

- Namespace where to install Paralus controller
- Version of Paralus helm-chart to be used while deploying the add-on
- Development - this flag deploys kratos in dev mode, install postgres, by default it is true

- fqdn:
  # -- Root domain
  domain: paralus.local
  # -- subdomain used for viewing dashboard
  hostname: "console"
  # -- a wildcard subdomain used for controller cluster to target
  # -- cluster communication
  coreConnectorSubdomain: "*.core-connector"
  # -- a wildcard subdomain used for controller cluster to end user
  # -- communication
  userSubdomain: "*.user"

For more information on various helm chart values that can be configured, please refer: https://github.com/paralus/helm-charts/blob/main/charts/ztka/values.yaml

For more information on Paralus, please visit: https://www.paralus.io/