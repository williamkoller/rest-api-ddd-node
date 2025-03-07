resource "aws_launch_template" "nodejs_lt" {
  name          = "nodejs-template"
  image_id      = var.ami_id
  instance_type = var.instance_type
}

resource "aws_autoscaling_group" "nodejs_asg" {
  vpc_zone_identifier = [aws_subnet.public_subnet.id]
  desired_capacity    = 2
  max_size           = 5
  min_size           = 2
  launch_template {
    id      = aws_launch_template.nodejs_lt.id
    version = "$Latest"
  }
}
