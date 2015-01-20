#The Paymo 3 API

The Paymo 3 API is not compatible with the [Paymo 2 API](http://api.paymo.biz/). This is a [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) API that uses XML/JSON for serialization.

Accepted request types (HTTP verbs) are: GET, POST, PUT, DELETE.

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

##Authentication

For the moment, only [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) is available. This is secure because all requests go over SSL.
 
Read the [authentication guide](https://github.com/paymoapp/api/blob/master/sections/authentication.md) for more details.

##Request and response content types

Paymo 3 API supports JSON as well as XML for data serialization, as well as specific types such as PDF, XLS for reports, invoices, estimates.

Read more about [content types](sections/content_types.md).

##Response codes and error handling

The Paymo 3 API will return a 2xx status code for successful requests. The 4xx error means an error on the user side. And the 5xx errors are returned when the Paymo service is having trouble processing your request.

The response in case of error will contain an error message to help you fix it.

You may want to consult a reference for [HTTP Status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

##Common API structures

###Object types

This is the list of object types that exist in the Paymo 3 API:

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
* [Tags](sections/tags.md)
* [Project Templates](sections/project_templates.md)
* [Invoice Templates](sections/invoice_templates.md)
* [Estimate Templates](sections/estimate_templates.md)

##Filtering

If you want to filter the response of listings, you can do so by supplying the `where` parameter in the request URL. 

Read more about [response filtering](sections/filtering.md)

##Including related content

If you want a response to include additional information about an object, you can do so by supplying the `include` or `partial_include` parameters in the request URL. 

Read more about [additional includes](sections/includes.md)

##Help us make it better

Please tell us how we can make the API better. If you have a specific feature request or if you found a bug, please use GitHub issues. Fork these docs and send a pull request with improvements.