# Tasks

* [Getting tasks](#list)
* [Getting a task](#get)
* [Creating a task](#create)
* [Updating a task](#update)
* [Changing the order of tasks](#update-tasks-order)
* [Adding a file to a task](#add-file)
* [Changing task workflow status](#status)
* [Changing task priority](#priority)
* [Changing the order of subtasks](#update-subtasks-order)
* [Deleting a task](#delete)
* [Task billing](#billing)
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
* `/api/tasks?where=mytasks=true` for a list of "My Tasks", those are tasks assigned to the user making the request, or tasks not assigned to any specific user, tasks being limited only to the projects the user is assigned to.

Example of response:

```json
{
   "tasks": [      
      {
         "id": 2158,
         "name": "Design",
         "code": "PD-16",
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
         "code": "PD-17",
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
         "code": "PD-12",
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

When `project_id` is provided and `tasklist_id` is not, the task will be added to the `Default Task List`. In case there is no task list named `Default Task List`, such a task list will be created.

### Required fields

When creating a task: `name`, `tasklist_id` or `project_id`

<a name="update"></a>
## Updating a task

To update an existing task, make a POST or PUT request to:

* `/api/tasks/[TASK_ID]`

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

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@screenshot.png"
  https://app.paymoapp.com/api/tasks/12345
```

The file can also be added when creating the task. In that case, all the task fields should be send in `multipart-form-data` format together with the file.

<a name="status"></a>
## Changing task workflow status

To change task's status, make an update request with the following request body:

```json
{
   "status_id": WORKFLOW_STATUS_ID
}
```

The list of available task statuses can be obtained from the project workflow.

**NOTE** When a task is marked as completed, the task workflow status is changed to "Complete" and when it is activated, the task workflow status is changed to "Backlog".

<a name="priority"></a>
## Changing task priority

To change task's priority, make an update request with the following request body:

```json
{
   "priority": TASK_PRIORITY
}
```

Allowed task priorities: 100, 75, 50, 25.
* 100 - Critical
* 75 - High
* 50 - Normal
* 25 - Low

**NOTE** All tasks are created with Normal (50) priority if not specified otherwise

<a name="update-subtasks-order"></a>
## Changing the order of subtasks

To reorder the subtasks in a task you need to make an **update task** request with a body similar to:

```json
{
    "subtasks_order": [ 39, 2, 10, 9, 11 ]
}
```

where `subtasks_order` is a list of subtask ids in the new order.

<a name="delete"></a>
## Deleting a task 

To delete a task, make a DELETE request to:

* `/api/tasks/[TASK_ID]`

If successful, the response will have a `200 OK` status code.

### Warning

**Deleting a task will also delete all time entries logged for that task!**

<a name="billing"></a>
## Task billing

Tasks from billable projects (flat rate projects and time & materials projects) can be:
* time based
* flat rate
* non-billable

### Time based tasks

Defining fields for time based tasks:
* `billable` will be `true`
* `flat_billing` will be `false`
* `price_per_hour` will be the task hourly rate. See project's [`hourly_billing_mode`](projects.md#billing) for how the actual hourly rate is selected.

Example request to create a time based task:

* POST `/api/tasks` with the body:

```json
{
    "name": "Time based task",
    "billable": true,
    "flat_billing": false,
    "price_per_hour": 50.00,
    "tasklist_id": 1234
}
```

### Flat rate tasks

Defining fields for time based tasks:
* `billable` will be `true`
* `flat_billing` will be `true`
* `estimated_price` will be the task flat rate

Example request to create a flat rate task:

* POST `/api/tasks` with the body:

```json
{
    "name": "Flat rate task",
    "billable": true,
    "flat_billing": true,
    "estimated_price": 100.00,
    "tasklist_id": 1234
}
```

See also [project billing](projects.md#billing).

<a name="object"></a>
## The task object

A task object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique task identifier
name | text | Task name
code | text | | _(read-only)_ | Task code format <project code>-<task number>.
project_id | integer | _(read-only)_ Project id
tasklist_id | integer | Task list id
seq | integer | Position (order) of the task in the task list
description | text | Task description and notes
complete | boolean | If `true` the task is marked as complete
completed_on | integer | _(read-only)_ Date and time when the subtask was completed
completed_by | integer | _(read-only)_ Id of the user that completed the subtask
due_date | date | Task due date. If task is not completed and due date has passed, the task is overdue.
user_id | integer | Id of the user who created the task
users | list | List of user ids that are assigned to the task. If no users are assigned, anyone assigned to the project sees this task in "My Tasks".
billable | boolean | Only for tasks from billable projects, if `true` the task is billable. See [billing](#billing).
flat_billing | boolean | Only for tasks from time & materials projects, if `true` the task has a flat rate. See [billing](#billing).
price_per_hour | decimal | For billable time based tasks, price per hour when billing the time for this task. Note: actual hourly rate used depends on project's `hourly_billing_mode`. See [project billing](projects.md#billing).
budget_hours | decimal | Budget hours for the task
estimated_price | decimal | For billable tasks, the estimated task price based on tracked time for time based tasks, and the task flat price for flat rate tasks.
invoiced | boolean | For flat rate tasks, if `true`, the task was already invoiced.
invoice_item_id | integer | For flat rate tasks, if set, the ID of the invoice line (part of the invoice for the task).
priority | integer | Task priority. See [priority](#priority).
status_id | integer | Task workflow status. See [task status](#status).
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[Task List](tasklists.md) | tasklist | parent
[User](users.md) | user | parent
[Comments Thread](comments.md) | thread | parent
[Time Entry](entries.md) | entries | child
[Invoice Item](invoices.md) | invoiceitem | parent
[Workflow Status](workflow_status.md) | workflowstatus | parent
