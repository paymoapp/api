# Content types

## Request content type

** All POST and PUT requests should send the `Content-Type` header** with the appropriate value.

Supported types:

### application/json

Example:

```shell
curl -u email:password 
  -H 'Content-Type: application/json' 
  -d '{"name": "new name"}'
  https://app.paymoapp.com/api/projects/12345
```

### text/xml

Example:

```shell
curl -u email:password 
  -H 'Content-Type: text/xml' 
  -d '<request><name>new name</name></request>'
  https://app.paymoapp.com/api/projects/12345
```

### application/x-www-form-urlencoded
 
Example:

```shell
curl -u email:password 
  -H 'Content-Type: application/x-www-form-urlencoded' 
  -d 'name=new%20name'
  https://app.paymoapp.com/api/projects/12345
```

### multipart/form-data

This content type is used when uploading files.

## Response content type

The format of the response is specified by the `Accept` header.  

The options are:

* `Accept: application/json` for getting the response in JSON format.
* `Accept: text/xml` for XML format.

If `Accept` header is not specified, the response will be in JSON format by default.

Additionally, for reports, invoices, estimates, expenses there is a PDF version of the document. You can get it by adding a `format=pdf` param to the query string.

For reports, adding `format=xlsx` will return the report in MS Excel format.

