resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine              = "postgres"
  engine_version      = "14.4"
  instance_class      = var.db_instance_type
  username           = "admin"
  password           = "Q1w2e3r4t5y6u7i8o9p0"
  publicly_accessible = false
  skip_final_snapshot = true
}
