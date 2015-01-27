# Clients

* [Getting clients](#list)
* [Getting a client](#get)
* [Creating a client](#create)
* [Updating a client](#update)
* [Archiving or activating a client](#archive)
* [Adding a client logo](#add-image)
* [Deleting a client](#delete)
* [Client object](#object)
* [Dependent objects](#dependecies)

<a name="list"></a>
## Getting clients

You can list clients by making a GET request to:

* `/api/clients` for a list of all clients
* `/api/clients?where=active=true` for a list of active clients
* `/api/clients?where=active=false` for a list of archived clients
 
Example of response:

```json
{
   "clients": [
      {
         "id": 1,
         "name": "NBC Universal, Inc.",
         "address": "1277 Fairfax Drive",
         "city": "New York",
         "state": "NY",
         "postal_code": "07302",
         "country": "US",
         "phone": "646-772-0207",
         "fax": "646-772-0207",
         "email": "sales@nbc.com",
         "website": "www.nbc.com",
         "image": "https://app.paymoapp.com/assets/1/clients/fd1fc0c388bbd7aff03a6be5aa5f8945.png",
         "fiscal_information": "",
         "active": true,
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2014-08-04T12:12:13Z"
      },
      {
         "id": 2,
         "name": "Best Buy Co., Inc.",
         "address": "4965 North Street\n",
         "city": "Richfield",
         "state": "Minnesota",
         "postal_code": "84116",
         "country": "US",
         "phone": "716-592-1227",
         "fax": "716-592-1227",
         "email": "sales@bestbuy.com",
         "website": "www.bestbuy.com",
         "image": "https://app.paymoapp.com/assets/1/clients/103bcf5e11fa4f261151e2a3b69be269.png",
         "fiscal_information": "",
         "active": true,
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2014-08-13T12:35:48Z"
      }
   ]
}     
```

You can also [include related content](includes.md) when listing clients.

<a name="get"></a>
## Getting a client

To get the client info, make a GET request to:

* `/api/clients/[CLIENT_ID]`

Example response:

```json
{
   "clients": [
      {
         "id": 1,
         "name": "NBC Universal, Inc.",
         "address": "1277 Fairfax Drive",
         "city": "New York",
         "state": "NY",
         "postal_code": "07302",
         "country": "US",
         "phone": "646-772-0207",
         "fax": "646-772-0207",
         "email": "sales@nbc.com",
         "website": "www.nbc.com",
         "image": "https://app.paymoapp.com/assets/1/clients/fd1fc0c388bbd7aff03a6be5aa5f8945.png",
         "fiscal_information": "",
         "active": true,
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2014-08-04T12:12:13Z"
      }
   ]
}  
```

You can also [include related content](includes.md) when getting a client.

<a name="create"></a>
## Creating a client

To create a client, make a POST request to:

* `/api/clients`

with the request body containing the new client info, as in the example below:

```json
{
    "name": "Smith and Sons",
    "email": "office@smithandsons.com"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new client. The response body will contain the new client info as in the **Getting a client** section.

### Required fields

When creating a client: `name`.

## Updating a client

To update an existing client, make a POST or PUT request to:

* `/api/clients/[CLIENT_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the client name and address:

```json
{
    "name": "Smith and Sons Ltd.",
    "address": "2000 Salmon Creek Lane\nJuneau, AK 99801"
}
```

The response will return `200 OK` and will contain the updated client info as in the **Getting a client** section.

<a name="archive"></a>
## Archiving or activating a client

To archive a client, make an update request with the following body:

```json
{
    "active": false
}
```

To activate, send a `true` value.

<a name="add-image"></a>
## Adding a client logo 

To add a client logo image, make a POST request to:

* `/api/clients/[CLIENT_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `image`. Here's an example using `curl` command line:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "image=@logo.png"
  https://app.paymoapp.com/api/clients/12345
```

Accepted image file formats are: JPEG, PNG, GIF.

The logo image of a client can be added when creating the client. In that case, all the client fields should be send in `multipart-form-data` format together with the file.

<a name="delete"></a>
## Deleting a client

To delete a client, make a DELETE request to:

* `/api/clients/[CLIENT_ID]`

If successful, the response will have a `200 OK` status code.

### Warning

**Deleting a client will also delete all info related to that client: projects, task and task lists, time entries from those projects!**

<a name="object"></a>
## The client object

A client object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique client identifier
name | text | Client name
address | text | Street address
city | text | City name
postal_code | text | Postal code
country | text | Country name
state | text | State or Region name
phone | text | Phone number
fax | text | Fax number
email | email | Email address
website | url | Website address
active | boolean | _(read-only)_ If `true` the client is active, otherwise the client is archived.
fiscal_information | text | Fiscal information. It is used in invoice headers to display client details. 
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the client was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the client was last updated
image | url | Client logo image URL
image_thumb_large | url | _(read-only)_ Client logo image large size thumbnail URL
image_thumb_medium | url | _(read-only)_ Client logo image medium size thumbnail URL
image_thumb_small | url | _(read-only)_ Client logo image small size thumbnail URL

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Client contact](client_contacts.md) | clientcontacts | child
[Project](projects.md) | projects | child
[Invoice](invoices.md) | invoices | child
[Recurring invoice profile](recurring_profiles.md) | recurringprofiles | child
