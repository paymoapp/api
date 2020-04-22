# Task recurring profiles

* [Getting task recurring profiles](#list)
* [Getting a task recurring profile](#get)
* [Creating a task recurring profile](#create)
* [Updating a task recurring profile](#update)
* [Deleting a task recurring profile](#delete)
* [The task recurring profile object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting task recurring profiles

You can list task recurring profiles by making a GET request to:

* `/api/taskrecurringprofiles` for a list of all task recurring profile from all projects
* `/api/taskrecurringprofiles?where=project_id=[PROJECT_ID]` for a list of task recurring profiles from a project 

Example of response:

```json
{
    "taskrecurringprofiles": [
       {
           "id": 1,
           "name": "Design",
           "project_id": 4,
           "tasklist_id": 21,
           "user_id": 1,
           "task_user_id": null,
           "company_id": 1,
           "billable": true,
           "flat_billing": false,
           "description": "",
           "price_per_hour": null,
           "estimated_price": null,
           "budget_hours": null,
           "users": [],
           "priority": 50,
           "notifications": "{}",
           "frequency": "daily",
           "interval": 1,
           "on_day": [],
           "occurrences": null,
           "until": "2020-04-25",
           "active": true,
           "due_date_offset": 0,
           "recurring_start_date": "2020-04-22",
           "generated_count": null,
           "last_generated_on": null,
           "next_processing_date": "2020-04-23",
           "processing_timezone": "US/Central",
           "processing_hour": "06:00:00",
           "created_on": "2020-04-22T08:21:34Z",
           "updated_on": "2020-04-22T08:21:34Z"
       },{
            "id": 2,
            "...": "..."
        }   
   ]
}
```

You can also [include related content](includes.md) when listing task recurring profiles.

<a name="get"></a>
## Getting a task recurring profile 

To get the task recurring profile info, make a GET request to:

* `/api/taskrecurringprofiles/[TAKSRECURRINGPROFILE_ID]`

Example response:

```json
{
   "taskrecurringprofiles": [  
        {    
          "id": 2,
          "name": "Evaluation",
          "project_id": 9,
          "tasklist_id": 28,
          "user_id": 1,
          "task_user_id": null,
          "company_id": 1,
          "billable": true,
          "flat_billing": false,
          "description": "",
          "price_per_hour": null,
          "estimated_price": null,
          "budget_hours": 11,
          "users": [
              3,
              8,
              9
          ],
          "priority": 50,
          "notifications": "{\"0\":{\"notification_enabled\":\"1\",\"notification_type\":\"task_due_date_reminder\",\"param\":\"24\"}}",
          "frequency": "weekly",
          "interval": 1,
          "on_day": [
              1,
              3
          ],
          "occurrences": 11,
          "until": null,
          "active": true,
          "due_date_offset": 3,
          "recurring_start_date": "2020-04-23",
          "generated_count": null,
          "last_generated_on": null,
          "next_processing_date": "2020-04-27",
          "processing_timezone": "US/Central",
          "processing_hour": "06:00:00",
          "created_on": "2020-04-22T08:26:25Z",
          "updated_on": "2020-04-22T09:31:05Z"
      }
   ]
}
```

You can also [include related content](includes.md) when getting a task recurring profiles.

<a name="create"></a>
## Creating a task recurring profile

To create a task recurring profile, make a POST request to:

* `/api/taskrecurringprofiles`

with the request body containing the new task recurring profile info, as in the example below:

```json 
{
	"id": 1,
    "name": "Design",
    "project_id": 4,
    "frequency": "weekly",
    "interval": "1",
    "recurring_start_date": "2020-04-12"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new task recurring profile. The response body will contain the new task recurring profile info as in the **Getting a task recurring profile** section.

### Required fields

When creating a task recurring profile: `name` and  `project_id` or `task_id` and then `frequency`, `interval`, `recurring_start_date`

Using a `task_id` will import all data from that task and disregard any other fields sent in request related to task
but will keep all fields sent in request specific to recurrence (like `frequency`, `interval`, `on_day`, `occurrences`, `active`, `recurring_start_date`... ):
{
	"id": 1,
    "name": "Design",
    "task_id": 10,
    "frequency": "weekly",
    "interval": "1",
    "recurring_start_date": "2020-04-12"
}
The above will take `name` from the task with id 10 and disregard "name": "Design".

<a name="update"></a>
## Updating a task recurring profile

To update an existing task recurring profile, make a POST or PUT request to:

* `/api/taskrecurringprofiles/[TASKRECURRINGPROFILE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the task recurring profile name:

```json
{
    "name": "Changes to logo"
}
```

The response will return `200 OK` and will contain the updated task recurring profile info as in the **Getting a task recurring profile** section.

<a name="delete"></a>
## Deleting a task recurring profile 

To delete a task recurring profile, make a DELETE request to:

* `/api/taskrecurringprofiles/[TASKRECURRINGPROFILE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The task recurring profile object

A task recurring profile object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique task identifier
name | text | Task name
code | text | | _(read-only)_ | Task code format <project code>-<task number>.
project_id | integer | Project id
tasklist_id | integer | Task list id
user_id | integer | _(read-only)_ Id of the user who created the task recurring profile
task_user_id | integer | _(read-only)_ Id of the user who created the task if task recurring profile is created based on a task.
billable | boolean | Only for tasks from billable projects, if `true` the tasks created will be billable. See [billing](#billing).
flat_billing | boolean | Only for tasks from time & materials projects, if `true` the tasks created will have a flat rate. See [billing](#billing).
description | text | Task description and notes
price_per_hour | decimal | For billable time based tasks, price per hour when billing the time for tasks created with this profile
estimated_price | decimal | The estimated task price
budget_hours | decimal | Budget hours for the task
users | list | List of user ids that are assigned to the task
priority | integer | Task priority. See [priority](#priority)
notifications | text | An array of notifications where each item must have `notification_type` and `param` representing alert threshold value Ex: {"notification_enabled":"1","notification_type":"task_due_date_reminder","param":"24"}
frequency | text | Frequency can only be `daily`, `weekly` and `monthly`
interval | integer | Represents after how many frequency periods to create task
on_day | text | The particular month day to create task
occurrences | integer | After how many occurrences to stop creating tasks
until | date | Date until to keep creating tasks
active | boolean | If task recurring profile is active or halted
due_date_offset | integer | This is used as task duration
recurring_start_date | date | This date will be considered as a reference for calculating the next date for generating a task. 
generated_count | integer | Number of generated tasks so far
last_generated_on | date | Last date when a task ws generated
next_processing_date | date | Next date when a task will be generated
processing_timezone | text | Timezone used when generating tasks
processing_hour | time | Hour used when generating tasks
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
