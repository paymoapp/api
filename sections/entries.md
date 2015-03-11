# Time entries

* [Getting time entries](#list)
* [Getting a time entry](#get)
* [Creating a time entry](#create)
* [Updating a time entry](#update)
* [Deleting a time entry](#delete)
* [The time entry object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting time entries

You can list timesheet entries by making a GET request to:

* `/api/entries?where=project_id=[PROJECT_ID]` for a list of time entries from a project 
* `/api/entries?where=task_id=[TASK_ID]` for a list of time entries for a task 
* `/api/entries?where=user_id=[USER_ID]` for a list of time entries for a user 
* `/api/entries?where=client_id=[CLIENT_ID]` for a list of time entries for a client
* `/api/entries?where=time_interval in ("2014-12-01T00:00:00Z","2015-01-01T00:00:00Z")` for a list of time entries between Dec 1st, 2014 and Jan 1st, 2015.
 
Example of response:

```json
{
  "entries": [
     {
        "id": 15200864,
        "task_id": 241184,
        "user_id": 1563,
        "start_time": "2014-12-11T09:30:00Z",
        "end_time": "2014-12-11T10:15:00Z",
        "description": "",
        "added_manually": true,
        "invoice_item_id": null,
        "billed": false,
        "is_bulk": false,
        "project_id": 28934,
        "created_on": "2014-12-12T14:42:49Z",
        "updated_on": "2014-12-12T14:42:49Z",
        "duration": 2700
     },
     {
        "id": 12186606,
        "task_id": 2093082,
        "user_id": 1563,
        "description": "",
        "added_manually": false,
        "invoice_item_id": null,
        "billed": false,
        "is_bulk": true,
        "project_id": 347452,
        "created_on": "2014-10-21T09:07:39Z",
        "updated_on": "2014-10-21T09:07:39Z",
        "duration": 21600,
        "date": "2014-10-21"
     }
  ]
}
```

You can also [include related content](includes.md) when listing entries.

<a name="get"></a>
## Getting a time entry

To get the time entry info, make a GET request to:

* `/api/entries/[ENTRY_ID]`

Example response:

```json
{
  "entries": [
     {
        "id": 15200864,
        "task_id": 241184,
        "user_id": 1563,
        "start_time": "2014-12-11T09:30:00Z",
        "end_time": "2014-12-11T10:15:00Z",
        "description": "",
        "added_manually": true,
        "invoice_item_id": null,
        "billed": false,
        "is_bulk": false,
        "project_id": 28934,
        "created_on": "2014-12-12T14:42:49Z",
        "updated_on": "2014-12-12T14:42:49Z",
        "duration": 2700
     }
  ]
}
```

You can also [include related content](includes.md) when getting a time entry.

<a name="create"></a>
## Creating a time entry

To create a time entry, make a POST request to:

* `/api/entries`

with the request body containing the new time entry info, as in the examples below:

```json
{
   "task_id": 241184,
   "start_time": "2014-12-10T09:00:00Z",
   "end_time": "2014-12-10T10:00:00Z",
   "description": "Talked to Susan on the phone."
}
```

to add a time entry with a start and end time, or:

```json
{
   "task_id": 241184,
   "date": "2014-12-10",
   "duration": 3600,
   "description": "Talked to Peter on the phone."
}
```

to add a time entry with a date and duration. Duration is the length of the entry in _seconds_. 

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new time entry. The response body will contain the new time entry info as in the **Getting a time entry** section.

### Required fields

When creating a time entry: `task_id`, (`date` and `duration`) or (`start_time` and `end_time`).

<a name="update"></a>
## Updating a time entry

To update an existing time entry, make a POST or PUT request to:

* `/api/entries/[ENTRY_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the duration:

```json
{
   "duration": 7200
}
```

You can change the `duration` only for the time entries that were added with `date` and `duration` parameters. 

For entries added with `start_time` and `end_time` the duration can be adjusted by updating the `end_time`.

The response will return `200 OK` and will contain the updated time entry info as in the **Getting a time entry** section.

<a name="delete"></a>
## Deleting a time entry

To delete a time entry, make a DELETE request to:

* `/api/entries/[ENTRY_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The time entry object

A time entry object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique entry identifier
project_id | integer | _(read-only)_ Project id
task_id | integer | Id of the task for which the time is added
user_id | integer | Id of the user for whom the time is added
is_bulk | boolean | If `true` the entry was added with `date` and `duration`, `false` if entry was added with `start_time` and `end_time`.
start_time | datetime | Date and time when the time entry started. Note: `start_time` and `end_time` are not present for entries with `date` and `duration`.
end_time | datetime | Date and time when the time entry ended
date | date | Date when the time entry was added. Note: `date` and `duration` are not present for entries with `start_time` and `end_time`. 
duration | integer | Time entry duration in seconds
description | text | Time entry description
added_manually | boolean | If `false` the entry was added using a timer (using start/stop in Paymo Widget).
billed | boolean | If `true` the entry is billed. Time for the entry was added into an invoice.
invoice_item_id | integer | Id of the invoice item if the entry was billed (added into an invoice).
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the entry was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the entry was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[Task](tasks.md) | task | parent
[Invoice item](invoices.md) | invoiceitem | parent
[User](users.md) | user | parent

