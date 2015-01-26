# Tasks

* [Getting tasks](#list)
* [Getting a task](#get)
* [Creating a task](#create)
* [Updating a task](#update)
* [Changing the order of tasks](#update-tasks-order)
* [Adding a file to a task](#add-file)
* [Deleting a task](#delete)
* [The task object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting tasks

You can list tasks by making a GET request to:

* `/api/tasks` for a list of all task from all projects
* `/api/tasks?where=project_id=[PROJECT_ID]` for a list of task from a project
* `/api/tasks?where=tasklist_id=[TASKLIST_ID]` for a list of task from a task list
* `/api/tasks?where=complete=false and project_id=[PROJECT_ID]` for a list of incomplete tasks from a project 
* `/api/tasks?where=users=[USER_ID]` for a list tasks assigned to a user 
* `/api/tasks?where=users in ([USER1_ID],[USER2_ID])` for a list tasks assigned to USER1 or USER2 
* `/api/tasks?where=users=anyone` for a list tasks that have no users assigned 
* `/api/tasks?where=users in ("anyone",[USER1_ID])` for a list tasks that have no users assigned or are assigned to USER1 
* `/api/tasks?where=users<>anyone` for a list tasks that have some user assigned  
 
Example of response:

```json
{
   "tasks": [      
      {
         "id": 2158,
         "name": "Design",
         "project_id": 1,
         "tasklist_id": 2,
         "user_id": 1,
         "complete": false,
         "billable": true,
         "seq": 1,
         "description": "",
         "price_per_hour": null,
         "due_date": null,
         "budget_hours": null,
         "users": [
            45
         ],
         "created_on": "2014-07-25T11:16:24Z",
         "updated_on": "2014-10-13T14:22:53Z"
      },
      {
         "id": 3320,
         "name": "Testing",
         "project_id": 1,
         "tasklist_id": 3,
         "user_id": 2,
         "complete": true,
         "billable": true,
         "seq": 2,
         "description": "",
         "price_per_hour": null,
         "due_date": "2014-10-30",
         "budget_hours": null,
         "users": [],
         "created_on": "2014-07-25T11:18:11Z",
         "updated_on": "2014-08-23T14:22:05Z"
      }
   ]
}
```

You can also [include related content](includes.md) when listing tasks.

<a name="get"></a>
## Getting a task 

To get the task info, make a GET request to:

* `/api/tasks/[TASK_ID]`
* `/api/tasks/[TASK_ID]?include=thread.comments` for task info with a list of comments to it
* `/api/tasks/[TASK_ID]?include=files` for task info with a list of attached files

Example response:

```json
{
   "tasks": [      
      {
         "id": 2158,
         "name": "Design",
         "project_id": 1,
         "tasklist_id": 2,
         "user_id": 1,
         "complete": false,
         "billable": true,
         "seq": 1,
         "description": "",
         "price_per_hour": null,
         "due_date": null,
         "budget_hours": null,
         "users": [
            45
         ],
         "created_on": "2014-07-25T11:16:24Z",
         "updated_on": "2014-10-13T14:22:53Z"
      }
   ]
}
```

You can also [include related content](includes.md) when getting a tasks.

<a name="create"></a>
## Creating a task

To create a task, make a POST request to:

* `/api/tasks`

with the request body containing the new task info, as in the example below:

```json 
{
  "name": "Logo Design",
  "description": "Please read the emails",
  "tasklist_id": 546,
  "users": [ 204 ]
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new task. The response body will contain the new task info as in the **Getting a task** section.

### Required fields

When creating a task list: `name`, `tasklist_id`.

<a name="update"></a>
## Updating a task

To update an existing task, make a POST or PUT request to:

* `/api/task/[TASK_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the task name:

```json
{
    "name": "Changes to logo"
}
```

The response will return `200 OK` and will contain the updated task info as in the **Getting a task** section.

<a name="update-tasks-order"></a>
## Changing the order of tasks

To reorder the tasks in a task list you need to make an **[update task list](tasklists.md#update-tasks-order)** request with a body similar to:

```json
{
    "tasks_order": [ 39, 2, 10, 9, 11, 12, 209 ]
}
```

where `tasks_order` is a list of task ids (from the task list) in the new order. 

You can change the order of a subset of tasks by sending only the list of task ids that changed their position.

<a name="add-file"></a>
## Adding a file to a task

To add a file to a task, make a POST request to:

* `/api/tasks/[TASK_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `file`. Here's an example using `curl` command line:

```curl
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@screenshot.png"
  https://app.paymoapp.com/api/tasks/12345
```

The file can also be added when creating the task. In that case, all the task fields should be send in `multipart-form-data` format together with the file.

<a name="delete"></a>
## Deleting a task 

To delete a task, make a DELETE request to:

* `/api/tasks/[TASK_ID]`

If successful, the response will have a `200 OK` status code.

### Warning

**Deleting a task will also delete all time entries logged for that task!**

<a name="object"></a>
## The task object

A task object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique task identifier
name | text | Task name
project_id | integer | _(read-only)_ Project id
tasklist_id | integer | Task list id
seq | integer | Position (order) of the task in the task list
description | text | Task description and notes
complete | boolean | If `true` the task is marked as complete
billable | boolean | If `true` the task is billable. It is used in invoicing when computing the cost of worked time on the task.
budget_hours | decimal | Number of budget hours for the task
due_date | date | Task due date. If task is not completed and due date has passed, the task is overdue.
user_id | integer | Id of the user who created the task
users | list | List of user ids that are assigned to the task. If no users are assigned, anyone assigned to the project sees this task in "My Tasks".
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the list was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the list was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[Task list](tasklists.md) | tasklist | parent
[User](users.md) | user | parent
[Comments thread](comments.md) | thread | parent
[Time entry](entries.md) | entries | child
