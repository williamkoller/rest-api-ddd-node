variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t3.micro"
}

variable "db_instance_type" {
  default = "db.t3.micro"
}

variable "ami_id" {
  description = "AMI ID para a instância EC2"
  default     = "ami-0c55b159cbfafe1f0" # Altere para a sua região
}
