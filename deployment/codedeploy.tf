resource "aws_iam_role" "codedeploy_role" {
  name = "CodeDeployRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "codedeploy.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "codedeploy_policy" {
  role       = aws_iam_role.codedeploy_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeDeployFullAccess"
}

resource "aws_codedeploy_app" "nodejs_app" {
  name = "nodejs-app"
}

resource "aws_codedeploy_deployment_group" "nodejs_deployment_group" {
  app_name               = aws_codedeploy_app.nodejs_app.name
  deployment_group_name  = "nodejs-deployment-group"
  service_role_arn       = aws_iam_role.codedeploy_role.arn

  ec2_tag_set {
    ec2_tag_filter {
      key   = "Name"
      type  = "KEY_AND_VALUE"
      value = "nodejs-server"
    }
  }

  deployment_style {
    deployment_type   = "IN_PLACE"
    deployment_option = "WITHOUT_TRAFFIC_CONTROL"
  }
}
