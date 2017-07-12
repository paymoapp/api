# Project statuses

* [Listing project statuses](#list)
* [Getting a project status](#get)
* [Creating a project status](#create)
* [Updating a project status](#update)
* [Deleting a project status](#delete)
* [The project status object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Listing project statuses

You can list your project statuses by making a GET request to:

* `/api/projectstatuses` for a list of all statuses
* `/api/projectstatuses?include=projects` for a list of project statuses with the projects info also included

Example of response:

```json
{
    "projectstatuses": [
        {
            "id": 28282,
            "name": "Active",
            "active": true,
            "readonly": true,
            "seq": 0,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        },
        {
            "id": 28283,
            "name": "Proposal",
            "active": true,
            "readonly": false,
            "seq": 1,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        },
        {
            "id": 28284,
            "name": "On-hold",
            "active": false,
            "readonly": false,
            "seq": 2,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        },
        {
            "id": 28285,
            "name": "Cancelled",
            "active": false,
            "readonly": false,
            "seq": 3,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        },
        {
            "id": 28286,
            "name": "Completed",
            "active": false,
            "readonly": false,
            "seq": 4,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        },
        {
            "id": 28287,
            "name": "Archived",
            "active": false,
            "readonly": true,
            "seq": 5,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        }
    ]
}
```

<a name="get"></a>
## Getting a project status

To get the project status info, make a GET request to:

* `/api/projectstatuses/[STATUS_ID]` for basic status info
* `/api/projectstatuses/[STATUS_ID]?include=projects` for a complete info about the status, including projects

Example response:

```json
{
    "projectstatuses": [
        {
            "id": 28282,
            "name": "Active",
            "active": true,
            "readonly": true,
            "seq": 0,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z"
        }
    ]
}
```

An example response with projects info included:

```json
{
    "projectstatuses": [
        {
            "id": 28282,
            "name": "Active",
            "active": true,
            "readonly": true,
            "seq": 0,
            "created_on": "2017-07-12T09:02:39Z",
            "updated_on": "2017-07-12T09:02:39Z",
            "projects": [
                {
                    "id": 1383832,
                    "name": "Paymo Walkthrough",
                    "description": "This walkthrough sample project contains a collection of tasks/to-dos that help describe the basics of using Paymo. If you need help you can always get in touch with us using the small chat icon in the bottom right corner of the screen.",
                    "client_id": 923821,
                    "status_id": 28282,
                    "active": true,
                    "adjustable_hours": null,
                    "hourly_billing_mode": null,
                    "budget_hours": 0.25,
                    "price_per_hour": 60,
                    "estimated_price": null,
                    "price": null,
                    "invoiced": false,
                    "invoice_item_id": null,
                    "billable": false,
                    "flat_billing": false,
                    "color": "#68BE5E",
                    "users": [
                        19393
                    ],
                    "managers": [
                        19393
                    ],
                    "created_on": "2017-07-12T09:02:39Z",
                    "updated_on": "2017-07-12T09:02:39Z",
                    "billing_type": "non"
                },
                {
                    "id": 2,
                    "name": "Product downloader",
                    "description": "",
                    "client_id": 923821,
                    "status_id": 28282,
                    "active": true,
                    "adjustable_hours": null,
                    "hourly_billing_mode": null,
                    "budget_hours": 105,
                    "price_per_hour": 90,
                    "estimated_price": 0,
                    "price": null,
                    "invoiced": false,
                    "invoice_item_id": null,
                    "billable": true,
                    "flat_billing": false,
                    "color": null,
                    "users": [
                        92983,
                        2392029
                    ],
                    "managers": [
                        92983
                    ],
                    "created_on": "2017-07-12T09:02:39Z",
                    "updated_on": "2017-07-12T09:06:37Z",
                    "billing_type": "pph"
                }
            ]
        }
    ]
}
```

<a name="create"></a>
## Creating a project status

To create a project status, make a POST request to:

* `/api/projectstatuses`

with the request body containing the new status info. 

Sample request body to create a status:

```json
{
	"name": "Preparation"	
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new project status. The response body will contain the new project status info as in the **Getting a project status** section.

### Required fields

When creating a project status: `name`.
For a complete description of all project status fields, see [project status object](#object).

<a name="update"></a>
## Updating a project status

To update an existing project status, make a POST or PUT request to:

* `/api/projectstatuses/[STATUS_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the status name:

```json
{
	"name": "New status name"
}
```

<a name="delete"></a>
## Deleting a project status

To delete a project status, make a DELETE request to:

* `/api/projectstatuses/[STATUS_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The project status object

A project status object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique status identifier
name | text | Status name
active | boolean | If true the project is being active (you can add time to its tasks), otherwise it is archived (you cannot add time to its tasks)
seq | integer | Position (order) of the status
readonly | boolean | _(read-only)_ If 'true' the status cannot be edited or deleted.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project status was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project status was last updated

<a name="dependencies"></a>

## Dependent objects
The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent

