# Tasks

* [Getting subtasks](#list)
* [Getting a subtask](#get)
* [Creating a subtask](#create)
* [Updating a subtask](#update)
* [Changing the order of subtasks](#update-subtasks-order)
* [Deleting a subtask](#delete)
* [The subtask object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting subtasks

You can list subtasks by making a GET request to:

* `/api/subtasks` for a list of all subtask from all projects
* `/api/subtasks?where=task_id=[TASK_ID]` for a list of subtask from a task
* `/api/subtasks?where=complete=false and task_id=[TASK_ID]` for a list of incomplete subtasks from a task 

Example of response:

```json
{
   "subtasks": [
       {
           "id": 1,
           "name": "Review design",
           "complete": true,
           "project_id": 4,
           "user_id": 1,
           "task_id": 7,
           "completed_on": "2020-04-22T06:54:52Z",
           "completed_by": 1,
           "created_on": "2020-04-22T06:50:55Z",
           "updated_on": "2020-04-22T06:54:52Z",
           "seq": 0
       },
       {
           "id": 2,
           "name": "Add new features",
           "complete": false,
           "project_id": 4,
           "user_id": 1,
           "task_id": 7,
           "completed_on": null,
           "completed_by": null,
           "created_on": "2020-04-22T06:53:59Z",
           "updated_on": "2020-04-22T06:53:59Z",
           "seq": 1
       },
       {
           "id": 3,
           "name": "Present design to the team",
           "complete": false,
           "project_id": 4,
           "user_id": 1,
           "task_id": 7,
           "completed_on": null,
           "completed_by": null,
           "created_on": "2020-04-22T06:54:13Z",
           "updated_on": "2020-04-22T06:54:50Z",
           "seq": 2
       }
   ]
}
```

You can also [include related content](includes.md) when listing subtasks.

<a name="get"></a>
## Getting a subtask 

To get the subtask info, make a GET request to:

* `/api/subtasks/[SUBTASK_ID]`

Example response:

```json
{
   "subtasks": [      
      {
         "id": 3,
         "name": "Present design to the team",
         "complete": false,
         "project_id": 4,
         "user_id": 1,
         "task_id": 7,
         "completed_on": null,
         "completed_by": null,
         "created_on": "2020-04-22T06:54:13Z",
         "updated_on": "2020-04-22T06:54:50Z",
         "seq": 2
     }
   ]
}
```

You can also [include related content](includes.md) when getting a subtasks.

<a name="create"></a>
## Creating a subtask

To create a subtask, make a POST request to:

* `/api/subtasks`

with the request body containing the new subtask info, as in the example below:

```json 
{
  "name": "Logo Design",
  "task_id": 546,
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new subtask. The response body will contain the new subtask info as in the **Getting a subtask** section.

### Required fields

When creating a subtask: `name`, `task_id`

<a name="update"></a>
## Updating a subtask

To update an existing subtask, make a POST or PUT request to:

* `/api/subtasks/[SUBTASK_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the subtask name:

```json
{
    "name": "Changes to logo"
}
```

The response will return `200 OK` and will contain the updated subtask info as in the **Getting a subtask** section.

<a name="update-subtasks-order"></a>
## Changing the order of subtasks

To reorder the subtasks in a subtask list you need to make an **[update task](tasks.md#update-subtasks-order)** request with a body similar to:

```json
{
    "subtasks_order": [ 39, 2, 10, 9, 11 ]
}
```

where `subtasks_order` is a list of subtask ids (from the list of subtasks from a task) in the new order. 

You can change the order of a subset of subtasks by sending only the list of subtask ids that changed their position.

<a name="delete"></a>
## Deleting a subtask 

To delete a subtask, make a DELETE request to:

* `/api/subtasks/[SUBTASK_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The subtask object

A subtask object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique subtask identifier
name | text | Task name
complete | boolean | If `true` the subtask is marked as complete
project_id | integer | _(read-only)_ Project id
user_id | integer | Id of the user who created the subtask
task_id | integer | Id of the task
seq | integer | Position (order) of the subtask in the subtask list
completed_on | integer | _(read-only)_ Date and time when the subtask was completed
completed_by | integer | _(read-only)_ Id of the user that completed the subtask
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the subtask was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the subtask was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[Task](tasks.md) | task | parent
[User](users.md) | user | parent
