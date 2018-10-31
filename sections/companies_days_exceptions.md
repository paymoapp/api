# Companies Days Exceptions

Days-exceptions is a date interval that defines a working or a non-working period of time.

* [Getting days-exceptions intervals](#list)
* [Getting a days-exceptions interval](#get)
* [Creating a days-exceptions interval](#create)
* [Updating a days-exceptions interval](#update)
* [Deleting a days-exceptions interval](#delete)
* [The days-exceptions object](#object)

<a name="list"></a>

## Getting days-exceptions intervals

You can list days-exceptions intervals by making a GET request to:

* `/api/companiesdaysexceptions`.
* `/api/companiesdaysexceptions?where=is_working=false` for a list of leaves.
* `/api/companiesdaysexceptions?where=is_working=true` for a list of additional working days.

Example of response:

```json
{
	"companiesdaysexceptions":[
		{
			"id":12,
			"date":"2017-06-25",
			"end_date":"2017-06-28",
			"leave_type_id":2,
			"creator_id":23,
			"hours_per_day":8,
			"status":"approved",
			"description":"This is a leave.",
			"is_working":false,
			"created_on":"2017-06-07T12:10:32Z",
			"updated_on":"2017-06-07T12:10:32Z"
		},
		{
			"id":13,
			"date":"2017-06-29",
			"end_date":"2017-06-30",
			"leave_type_id":4,
			"creator_id":21,
			"hours_per_day":4,
			"status":"pending",
			"description":"This is an additional working period.",
			"is_working":true,
			"created_on":"2017-06-21T18:15:04Z",
			"updated_on":"2017-06-21T18:15:04Z"
		}
	]
}
```

<a name="get"></a>
## Getting a days-exceptions interval

To get a days-exceptions interval, make a GET request to:

* `/api/companiesdaysexceptions/[COMPANY_DAYS_EXCEPTIONS_ID]`

Example response:

```json
{
	"companiesdaysexceptions": [
		{
			"id":12,
			"date":"2017-06-25",
			"end_date":"2017-06-28",
			"leave_type_id":2,
			"creator_id":23,
			"hours_per_day":8,
			"status":"approved",
			"description":"This is a leave.",
			"is_working":false,
			"created_on":"2017-06-07T12:10:32Z",
			"updated_on":"2017-06-07T12:10:32Z"
		}
	]
}
```

You can also [include related content](includes.md) when getting a days-exceptions interval.

<a name="create"></a>
## Creating a days-exceptions interval

To create a days-exceptions interval, make a POST request to:

* `/api/companiesdaysexceptions`

with the request body containing the new days-exceptions info, as in the examples below:

```json
{
	"date":"2017-06-25",
	"end_date":"2017-06-28",
	"is_working":false
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new days-exceptions interval. The response body will contain the new days-exceptions info as in the **Getting a days-exceptions interval** section.

<a name="update"></a>
## Updating a days-exceptions interval

To update an existing days-exceptions, make a POST or PUT request to:

* `/api/companiesdaysexceptions/[COMPANY_DAYS_EXCEPTIONS_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the days-exceptions leave_type_id:

```json
{
   "leave_type_id": 8
}
```

The response will return `200 OK` and will contain the updated days-exceptions info as in the **Getting a days-exceptions interval** section.

<a name="delete"></a>
## Deleting a days-exceptions interval

To delete a days-exceptions, make a DELETE request to:

* `/api/companiesdaysexceptions/[COMPANY_DAYS_EXCEPTIONS_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The days-exceptions object

A days-exceptions object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique days-exceptions identifier
date | [datetime](datetime.md) | Interval start date
end_date | [datetime](datetime.md) | Interval end date
leave_type_id | integer | The id of the leave type from the leave_types table (optional)
creator_id | integer | _(read-only)_ The id of the creator
hours_per_day | integer | Number of hours for each day in interval
status | text | Days-exceptions custom status
description | text | Days-exceptions description
is_working | boolean | Defines if a days-exceptions interval is working or it's a leave
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the days-exceptions was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the days-exceptions was last updated