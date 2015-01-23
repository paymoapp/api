# Client contacts

## Getting client contacts

You can list client contacts by making a GET request to:

* `/api/clientcontacts` for a list of all contacts for all clients
* `/api/clientcontacts?where=active=client_id=[CLIENT_ID]` for a list of all contacts for a specific client
 
Example of response:

```json
     {
        "clientcontacts": [
           {
              "id": 1,
              "client_id": 1,
              "name": "Aaron Cooper",
              "email": "aaron@stonecoppergrandy.com",
              "mobile": "630-350-5512",
              "phone": "361-613-5188",
              "fax": "361-613-5188",
              "skype": "Aaron.Cooper",
              "notes": null,
              "image": "https://app.paymoapp.com/assets/1/clients/1/contacts/7ce81eab305059b0484e439101533b1f.jpg",
              "is_main": true,
              "position": "Associate",
              "access": false,
              "created_on": "2013-07-24T11:52:44Z",
              "updated_on": "2014-08-13T13:00:24Z"
           },
           {
              "id": 2,
              "client_id": 2,
              "name": "Christian Meadows",
              "email": "christian@lackwannacounty.com",
              "mobile": "213-350-4605",
              "phone": "862-778-3343",
              "fax": "862-778-3343",
              "skype": "Christian.Meadows",
              "notes": null,
              "image": "https://app.paymoapp.com/assets/2/clients/2/contacts/ac5ec4905a07b2c9275045d49e824cb7.jpg",
              "is_main": true,
              "position": "CEO",
              "access": false,
              "created_on": "2013-07-24T11:52:44Z",
              "updated_on": "2014-08-07T09:23:15Z"
           }
        ]
     }
```

You can also [include related content](includes.md) when listing client contacts.

## Getting a client contact

To get the client contact info, make a GET request to:

* `/api/clientcontacts/[CONTACT_ID]`

Example response:

```json
 {
        "clientcontacts": [
           {
              "id": 1,
              "client_id": 1,
              "name": "Aaron Cooper",
              "email": "aaron@stonecoppergrandy.com",
              "mobile": "630-350-5512",
              "phone": "361-613-5188",
              "fax": "361-613-5188",
              "skype": "Aaron.Cooper",
              "notes": null,
              "image": "https://app.paymoapp.com/assets/1/clients/1/contacts/7ce81eab305059b0484e439101533b1f.jpg",
              "is_main": true,
              "position": "Associate",
              "access": false,
              "created_on": "2013-07-24T11:52:44Z",
              "updated_on": "2014-08-13T13:00:24Z"
           }
        ]
     }
```

You can also [include related content](includes.md) when getting a client contact.

## Creating a client contact

To create a client contact, make a POST request to:

* `/api/clientcontacts`

with the request body containing the new contact info, as in the example below:

```json
{
    "name": "James Mick",
    "client_id": 1,
    "email": "james@ea.com",
    "phone": "577-293-1857"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new client. The response body will contain the new client info as in the **Getting a client** section.

### Required fields

When creating a client: `name`, `client_id`.

## Updating a client contact

To update an existing client contact, make a POST or PUT request to:

* `/api/clientcontacts/[CONTACT_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the contact name and phone number:

```json
{
    "name": "James Mick Jr.",
    "phone": "578-293-1857"
}
```

The response will return `200 OK` and will contain the updated client contact info as in the **Getting a client contact** section.

## Giving access to clients portal

To give a client contact access to the clients portal, make an update request with the following body:

```json
{
    "access": true,
    "password": "secret"
}
```

The client contact will be able to login into clients portal using his email and provided password.

To remove access, make the update request with the following body:

```json
{
    "access": false
}
```

## Adding a client contact profile image 

To add a client contact profile image, make a POST request to:

* `/api/clientcontacts/[CONTACT_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `image`. Here's an example using `curl` command line:

```curl
curl -u email:password
  -H 'Accept: application/json'
  -F "image=@photo.jpg"
  https://app.paymoapp.com/api/clientcontacts/12345
```

Accepted image file formats are: JPEG, PNG, GIF.

The profile image of a client contact can be added when creating the client contact. In that case, all the client contact fields should be send in `multipart-form-data` format together with the file.

## Deleting a client contact

To delete a client contact, make a DELETE request to:

* `/api/clientcontacts/[CONTACT_ID]`

If successful, the response will have a `200 OK` status code.

## The client contact object

A client contact object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique client contact identifier
name | text | Client name
email | email | Email address
mobile | text | Mobile phone number
phone | text | Phone number
fax | text | Fax number
skype | text | Skype account name
notes | text | Notes
position | text | Job position description
is_main | boolean | If `true` the contact is the main contact for this client.
access | boolean | If `true` the contact has access to the client portal.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the contact was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the contact was last updated
image | url | Profile image URL
image_thumb_large | url | _(read-only)_ Profile image large size thumbnail URL
image_thumb_medium | url | _(read-only)_ Profile image medium size thumbnail URL
image_thumb_small | url | _(read-only)_ Profile image small size thumbnail URL

## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|--------
[Client](clients.md) | client | parent
