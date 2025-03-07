terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.aws_region
}

module "network" {
  source = "./vpc.tf"
}

module "security" {
  source = "./security.tf"
}

module "ec2" {
  source = "./ec2.tf"
}

module "alb" {
  source = "./alb.tf"
}

module "rds" {
  source = "./rds.tf"
}

module "codedeploy" {
  source = "./codedeploy.tf"
}

module "cloudwatch" {
  source = "./cloudwatch.tf"
}
