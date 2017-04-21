# Bookings (Resource Scheduling)

* [Getting bookings](#list)
* [Getting a booking](#get)
* [Creating a booking](#create)
* [Updating a booking](#update)
* [Deleting a booking](#delete)
* [The booking object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>

## Getting bookings

You can list bookings by making a GET request to:

* `/api/bookings?where=project_id=[PROJECT_ID]` for a list of bookings from a project 
* `/api/bookings?where=task_id=[TASK_ID]` for a list of bookings for a task 
* `/api/bookings?where=user_id=[USER_ID]` for a list of bookings for a user 
* `/api/bookings?where=user_id=[USER_TASK_ID]` for a list of bookings for task assignment
* `/api/bookings?where=date_interval in ("2016-12-01","2017-01-01")` for a list of bookings between Dec 1st, 2016 and Jan 1st, 2017.

You have to specify at least one `where` condition: `user_task_id`, or `task_id`, or `project_id`, or `user_id`, or `start_date` and `end_date`
 
Example of response:

```json
{
  "bookings": [
     {
        "id": 15200864,
        "user_task_id": 241184,
        "start_date": "2016-12-11",
        "end_date": "2016-12-12",
        "hours_per_day": 10,
        "description": "Plan the meeting",
        "created_on": "2014-12-12T14:42:49Z",
        "updated_on": "2014-12-12T14:42:49Z"
     },
     {
       "id": 15200864,
	   "user_task_id": 241185,
	   "start_date": "2016-12-15",
	   "end_date": "2016-12-25",
	   "hours_per_day": 8,
	   "description": null,
	   "created_on": "2014-12-12T14:42:49Z",
	   "updated_on": "2014-12-12T14:42:49Z"
     }
  ]
}
```

You can also [include related content](includes.md) when listing bookings.

<a name="get"></a>
## Getting a booking

To get the booking info, make a GET request to:

* `/api/bookings/[BOOKING_ID]`

Example response:

```json
{
	"bookings": [
		{
			"id": 15200864,
			"user_task_id": 241185,
			"start_date": "2016-12-15",
			"end_date": "2016-12-25",
			"hours_per_day": 4,
			"description": null,
			"created_on": "2014-12-12T14:42:49Z",
			"updated_on": "2014-12-12T14:42:49Z"
		}
	]
}
```

You can also [include related content](includes.md) when getting a booking.

<a name="create"></a>
## Creating a booking

To create a booking, make a POST request to:

* `/api/bookings`

with the request body containing the new booking info, as in the examples below:

```json
{
   "user_task_id": 241184,
   "start_date": "2016-12-10",
   "end_date": "2016-12-30",
   "hours_per_day": 5,
   "description": "Plan the meeting"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new booking. The response body will contain the new booking info as in the **Getting a booking** section.

* Important
UserTask required...

### Required fields

When creating a booking: `user_task_id`, `start_date`, `end_date` and `hours_per_day`.

<a name="update"></a>
## Updating a booking

To update an existing booking, make a POST or PUT request to:

* `/api/bookings/[BOOKING_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the booking start date:

```json
{
   "start_date": "2016-12-10"
}
```

The response will return `200 OK` and will contain the updated booking info as in the **Getting a booking** section.

<a name="delete"></a>
## Deleting a booking

To delete a booking, make a DELETE request to:

* `/api/bookings/[BOOKING_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The booking object

A booking object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique booking identifier
user_task_id | integer | Id of the user-task assignment
start_date | date | Date when the booking starts
end_date | date | Date when the booking ends
hours_per_day | integer | Allocated hours per day
description | text | Booking description
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the booking was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the booking was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[UserTask](users_tasks.md) | usertask | parent
