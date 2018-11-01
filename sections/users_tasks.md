# Task Assignments

* [Getting task assignments](#list)
* [Getting a task assignment](#get)
* [Creating a task assignment](#create)
* [Updating a task assignment](#update)
* [Deleting a task assignment](#delete)
* [The task assignment object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>

## Getting task assignments

You can list task assignments by making a GET request to:

* `/api/userstasks?where=user_id=[USER_ID]` for a list of task assignments for a user 
* `/api/userstasks?where=task_id=[TASK_ID]` for a list of user assignments for a task 

You have to specify at least one `where` condition: `user_id` or `task_id`
 
Example of response:

```json
{
  "userstasks": [
    {
      "id": 15200864,
      "user_id": 241185,
      "task_id": 1536,
      "created_on": "2017-02-16T14:43:11Z",
      "updated_on": "2017-02-16T14:43:11Z"
    },
    {
      "id": 15200864,
      "user_id": 241185,
      "task_id": 1533,
      "created_on": "2017-02-16T15:50:14Z",
      "updated_on": "2017-02-16T15:50:14Z"
    }
  ]
}
```

You can also [include related content](includes.md) when listing task assignments.

<a name="get"></a>
## Getting a task assignment

To get the task assignment info, make a GET request to:

* `/api/userstasks/[ASSIGNMENT_ID]`

Example response:

```json
{
  "userstasks": [
    {
      "id": 15200864,
      "user_id": 241185,
      "task_id": 1536,
      "created_on": "2017-02-16T14:43:11Z",
      "updated_on": "2017-02-16T14:43:11Z"
    }
  ]
}
```

You can also [include related content](includes.md) when getting a task assignment.

<a name="create"></a>
## Creating a task assignment

To create a task assignment, make a POST request to:

* `/api/userstasks`

with the request body containing the new task assignment info, as in the examples below:

```json
{
   "user_id": 241184,
   "task_id": 48591
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new task assignment. The response body will contain the new task assignment info as in the **Getting a task assignment** section.

### Required fields

When creating a task assignment: `user_id` and `task_id`.

### Note
 
You can also assign users to a task directly by updating the task's `users` attribute.

<a name="update"></a>
## Updating a task assignment

To update an existing task assignment, make a POST or PUT request to:

* `/api/userstasks/[ASSIGNMENT_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the task assignment task_id:

```json
{
   "task_id": 4059
}
```

The response will return `200 OK` and will contain the updated task assignment info as in the **Getting a task assignment** section.

<a name="delete"></a>
## Deleting a task assignment

To delete a task assignment, make a DELETE request to:

* `/api/userstasks/[ASSIGNMENT_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The task assignment object

A task assignment object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique task assignment identifier
user_id | integer | Id of the user
task_id | integer | Id of the task
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task assignment was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task assignment was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[User](users.md) | user | parent
[Task](tasks.md) | task | parent
