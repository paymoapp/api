# Task lists

## Getting task lists

You can list task lists by making a GET request to:

* `/api/tasklists` for a list of all task lists from all projects
* `/api/tasklists?where=project_id=[PROJECT_ID]` for a list of task lists from a project
* `/api/tasklists?where=milestone_id=[MILESTONE_ID]` for a list of task lists linked with a milestone
 
Example of response:

```json
     {
        "tasklists": [
           {
              "id": 499,
              "name": "Design",
              "project_id": 1,
              "seq": 1,
              "milestone_id": 3,
              "created_on": "2013-06-26T12:07:44Z",
              "updated_on": "2014-07-23T14:22:05Z"
           },
           {
              "id": 518,
              "name": "Coding",
              "project_id": 1,
              "seq": 2,
              "milestone_id": null,
              "created_on": "2013-06-26T12:07:44Z",
              "updated_on": "2014-07-23T14:22:05Z"
           }
        ]
     }
```

You can also [include related content](includes.md) when listing task lists.

## Getting a task list

To get the task list info, make a GET request to:

* `/api/tasklists/[TASKLIST_ID]`

Example response:

```json
 {
        "tasklists": [
           {
              "id": 499,
              "name": "Design",
              "project_id": 1,
              "seq": 1,
              "milestone_id": 3,
              "created_on": "2013-06-26T12:07:44Z",
              "updated_on": "2014-07-23T14:22:05Z"
           }
        ]
     }
```

You can also [include related content](includes.md) when getting a task list.

## Creating a task list

To create a task list, make a POST request to:

* `/api/tasklists`

with the request body containing the new task list info, as in the example below:

```json 
{
  "name": "Website Design",
  "project_id": 100
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new task list. The response body will contain the new task list info as in the **Getting a task list** section.

### Required fields

When creating a task list: `name`, `project_id`.

## Updating a task list

To update an existing task list, make a POST or PUT request to:

* `/api/tasklists/[TASKLIST_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the tasklist name:

```json
{
    "name": "Urgent tasks"
}
```

The response will return `200 OK` and will contain the updated task list info as in the **Getting a task list** section.

## Changing the order of task lists

To reorder the task lists in a project you need to make an **[update project](projects.md#update-tasklists-order)** request with a body similar to:

```json
{
    "tasklists_order": [ 493, 50, 128, 2, 4 ]
}
```

where `tasklists_order` is a list of task list ids in the new order.

<a name="update-tasks-order"></a>
## Changing the order of tasks 

To reorder the tasks in a task list you need to make an **update task list** request with a body similar to:

```json
{
    "tasks_order": [ 39, 2, 10, 9, 11, 12, 209 ]
}
```

where `tasks_order` is a list of task ids in the new order. 

**Note**: The order of tasks is defined per task list, not per project. 

## Deleting a task list

To delete a task list, make a DELETE request to:

* `/api/tasklists/[TASKLIST_ID]`

If successful, the response will have a `200 OK` status code.

### Warning

**Deleting a task list will also delete all other data from that tasklist: tasks and time entries!

## The task list object

A task list object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique task list identifier
name | text | Task list name
seq | integer | Position (order) of the task list in the project
milestone_id | integer | Id of the milestone it is linked with. If a task list is linked with a milestone, all tasks from the task list should be completed by the milestone due date. 
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the list was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the list was last updated

## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[Milestone](milestones.md) | milestone | parent
[Task](tasks.md) | tasks | child

