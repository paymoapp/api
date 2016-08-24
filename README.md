#Paymo API

* [Making a request](#make-request)
* [Authentication](#authentication)
* [Request and response content types](#content-types)
* [Response codes and error handling](#response-codes)
* [Rate limiting](#rate-limit)
* [API Endpoints](#api-endpoints)
* [Data formats](#data-formats)
* [Filtering](#filtering)
* [Including related content](#includes)


The Paymo is a [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) API that uses JSON/XML for serialization.

Accepted request types (HTTP verbs) are: GET, POST, PUT, DELETE.

<a name="make-request"></a>
##Making a request

The API base URL is `https://app.paymoapp.com/api/`. It is **SSL only**. There is no way to use the API over unsecure http:// protocol.

An example request using `curl` for retrieving the list of clients may look like this:

```shell
curl -u email:password 
  -H 'Accept: application/json' 
  https://app.paymoapp.com/api/clients
```

Updating a client using `curl` my look like:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -d "name=updated%20name"
  https://app.paymoapp.com/api/clients/12345
```

See sample [code examples](sections/sample_code.md) on how to make a request to the API.

<a name="authentication"></a>
##Authentication

Read the [authentication guide](https://github.com/paymoapp/api/blob/master/sections/authentication.md) for more details.

<a name="content-types"></a>
##Request and response content types

Paymo API supports JSON as well as XML for data serialization, as well as specific types such as PDF, XLS for reports, invoices, estimates.

Read more about [content types](sections/content_types.md).

<a name="response-codes"></a>
##Response codes and error handling

The Paymo API will return a 2xx status code for successful requests. The 4xx error means an error on the user side. And the 5xx errors are returned when the Paymo service is having trouble processing your request.

The response in case of error will contain an error message to help you fix it.

You may want to consult a reference for [HTTP Status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

<a name="rate-limit"></a>
## Rate limiting

If you exceed the rate limit, you'll get a [429 Too Many Requests](http://tools.ietf.org/html/draft-nottingham-http-new-status-02#section-4) response and for all following requests until the limit expires. A header `Retry-After` will also be returned and will represent the number of seconds you should wait before making the next request.

<a name="api-endpoints"></a>
## API endpoints

* [Company](sections/company.md)
* [Users](sections/users.md)
* [Sessions](sections/sessions.md)
* [Clients](sections/clients.md)
* [Client Contacts](sections/client_contacts.md)
* [Projects](sections/projects.md)
* [Task Lists](sections/tasklists.md)
* [Tasks](sections/tasks.md)
* [Time Entries](sections/entries.md)
* [Milestones](sections/milestones.md)
* [Files](sections/files.md)
* [Discussions](sections/discussions.md)
* [Comments](sections/comments.md)
* [Reports](sections/reports.md)
* [Invoices](sections/invoices.md)
* [Estimates](sections/estimates.md)
* [Recurring Invoice Profiles](sections/recurring_profiles.md)
* [Expenses](sections/expenses.md)
* [Tags](sections/tags.md)
* [Project Templates](sections/project_templates.md)
* [Invoice Templates](sections/invoice_templates.md)
* [Estimate Templates](sections/estimate_templates.md)

<a name="data-formats"></a>
## Data formats

* [Date and time values](sections/datetime.md)

For a sample and an explanation of each endpoint object, see individual endpoint pages.

<a name="filtering"></a>
##Filtering

If you want to filter the response of listings, you can do so by supplying the `where` parameter in the request URL. 

Read more about [response filtering](sections/filtering.md)

<a name="includes"></a>
##Including related content

If you want a response to include additional information about an object, you can do so by supplying the `include` or `partial_include` parameters in the request URL. 

Read more about [additional includes](sections/includes.md)

##Help us make it better

Please tell us how we can make the API better. If you have a specific feature request or if you found a bug, please use GitHub issues. Fork these docs and send a pull request with improvements.