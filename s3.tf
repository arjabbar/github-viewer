resource "aws_s3_bucket" "b" {
  bucket = "github-viewer.jabbar-web.com"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
