#Leave Types

* [Getting leave-types](#list)
* [Getting a leave-type](#get)
* [Creating a leave-type](#create)
* [Updating a leave-type](#update)
* [Deleting a leave-type](#delete)
* [The leave-type object](#object)

<a name="list"></a>

## Getting leave types

You can list leave types by making a GET request to:

* `/api/leavetypes`
* `/api/leavetypes?where=paid=true` for a list of paid leave types.

Example of response:

```json
{
	"leavetypes": [
		{
			"id":1,
			"name":"Vacation",
			"paid":true,
			"created_on":"2017-05-31T14:30:13Z",
			"updated_on":"2017-05-31T14:30:13Z"
		},
		{
			"id":2,
			"name":"Sick Leave",
			"paid":true,
			"created_on":"2017-05-31T14:30:13Z",
			"updated_on":"2017-05-31T14:30:13Z"
		}
	]
}

<a name="get"></a>
## Getting a leave-type

To get a leave-type, make a GET request to:

* `/api/leavetypes/[LEAVE_TYPE_ID]`

Example response:

```json
{
	"leavetypes": [
		{
			"id":1,
			"name":"Vacation",
			"paid":true,
			"created_on":"2017-05-31T14:30:13Z",
			"updated_on":"2017-05-31T14:30:13Z"
		}
	]
}
```

You can also [include related content](includes.md) when getting a leave-type.

<a name="create"></a>
## Creating a leave-type

To create a leave-type, make a POST request to:

* `/api/leavetypes`

with the request body containing the new leave-type info, as in the examples below:

```json
{
	"name":"Vacation",
	"paid":true
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new leave-type. The response body will contain the new leave-type info as in the **Getting a leave-type** section.

<a name="update"></a>
## Updating a leave-type

To update an existing leave-type, make a POST or PUT request to:

* `/api/leavetypes/[LEAVE_TYPE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the leave-type name:

```json
{
   "name": "Sick Leave"
}
```

The response will return `200 OK` and will contain the updated leave-type info as in the **Getting a leave-type** section.

<a name="delete"></a>
## Deleting a leave-type

To delete a leave-type, make a DELETE request to:

* `/api/leavetypes/[LEAVE_TYPE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The leave-type object

A leave-type object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique leave type identifier
name | text | Leave type description
paid | boolean | Leave type payable status
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the leave-type was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the leave-type was last updated
