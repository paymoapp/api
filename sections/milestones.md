# Milestones

* [Getting milestones](#list)
* [Getting a milestone](#get)
* [Creating a milestone](#create)
* [Updating a milestone](#update)
* [Completing a milestone](#complete)
* [Deleting a milestone](#delete)
* [The milestone object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting milestones

You can list milestones by making a GET request to:

* `/api/milestones` for a list of all the milestones
* `/api/milestones?where=due_date=2014-09-01` for a list of milestones that are due on Sep 1st, 2014
* `/api/milestones?where=due_date>2014-12-15 and complete=false` for a list of milestones that are due after Dec 15, 2014 and are not complete
* `/api/milestones?where=user_id=[USER_ID]` for a list of milestones assigned to a user
 
Example of response:

```json
{
   "milestones": [
      {
         "id": 60805,
         "name": "Integration",
         "project_id": 397707,
         "user_id": 23129,
         "due_date": "2014-11-23",
         "send_reminder": 0,
         "reminder_sent": true,
         "complete": false,
         "created_on": "2014-10-03T12:49:06Z",
         "updated_on": "2014-11-22T14:34:59Z",
         "linked_tasklists": []
      },
      {
         "id": 60806,
         "name": "Requirements",
         "project_id": 397717,
         "user_id": 23129,
         "due_date": "2014-11-11",
         "send_reminder": 48,
         "reminder_sent": false,
         "complete": false,
         "created_on": "2014-10-03T12:49:06Z",
         "updated_on": "2014-10-24T14:34:59Z",
         "linked_tasklists": [
            629824
         ]
      }
   ]
}   
```

You can also [include related content](includes.md) when listing milestones.

<a name="get"></a>
## Getting a milestone

To get the milestone info, make a GET request to:

* `/api/milestones/[MILESTONE_ID]`

Example response:

```json
{
   "milestones": [
      {
         "id": 60805,
         "name": "Integration",
         "project_id": 397707,
         "user_id": 23129,
         "due_date": "2014-11-23",
         "send_reminder": 0,
         "reminder_sent": true,
         "complete": false,
         "created_on": "2014-10-03T12:49:06Z",
         "updated_on": "2014-11-22T14:34:59Z",
         "linked_tasklists": []
      }
   ]
}   
```

You can also [include related content](includes.md) when getting a milestone.

<a name="create"></a>
## Creating a milestone

To create a milestone, make a POST request to:

* `/api/milestones`

with the request body containing the new milestone info, as in the example below:

```json
{
    "name": "Documentation",
    "project_id": 1234,
    "due_date": "2015-01-15",
    "user_id": 390
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new milestone. The response body will contain the new milestone info as in the **Getting a milestone** section.

### Required fields

When creating a milestones: `name`, `project_id`, `due_date`.

<a name="update"></a>
## Updating a milestone

To update an existing milestone, make a POST or PUT request to:

* `/api/milestones/[MILESTONE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the milestone due date:

```json
{
    "due_date": "2015-02-15"
}
```

The response will return `200 OK` and will contain the updated milestone info as in the **Getting a milestone** section.

<a name="complete"></a>
## Completing a milestone

To mark a milestone as complete, make an update request with the following body:

```json
{
    "complete": true
}
```

<a name="delete"></a>
## Deleting a milestone

To delete a milestone, make a DELETE request to:

* `/api/milestones/[MILESTONE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The milestone object

A milestone object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique milestone identifier
name | text | Milestone name
project_id | integer | Project id 
user_id | integer | Id of the user responsible for the milestone. This user will receive late milestone reminders.
due_date | [date](datetime.md) | Due date for the milestone
send_reminder | integer | How many hours before the due date the reminders will be sent. If `0`, no reminders will be sent.
reminder_sent | boolean | _(read-only)_ If `true` the reminder was sent.
complete | boolean | If `true` the milestone is marked as completed.
linked_tasklists | list | List of task list ids that are linked with this milestone.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the milestone was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the milestone was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[User](users.md) | user | parent
[Task list](tasklists.md) | tasklists | child
