# Projects

* [Getting projects](#list)
* [Getting a project](#get)
* [Creating a project](#create)
* [Updating a project](#update)
* [Archiving or activating a project](#archive)
* [Changing the order of task lists](#update-tasklists-order)
* [Deleting a project](#delete)
* [Adding tasks from a project template](#from-template)
* [The project object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting projects

You can list projects by making a GET request to:

* `/api/projects` for a list of all projects in your company.
* `/api/projects?where=client_id=[CLIENT_ID]` for a list of projects for a specific client.
* `/api/projects?where=active=true` for a list of active projects.
* `/api/projects?where=active=false` for a list of archived projects.
* `/api/projects?where=users=[USER_ID]` for a list of projects assigned to a specific user.
* `/api/projects?where=managers=[USER_ID]` for a list of projects managed by a specific user.

The list above is not exhausted. You can combine multiple conditions as in the following example:

* `/api/projects?where=active=true and manager=[USER_ID] and billable=true` for a list of active billable projects managed by a user with id [USER_ID]

Example response for listing requests:

```json
{
   "projects": [
      {
         "id": 397706,
         "name": "Understanding Paymo",
         "description": "",
         "client_id": 151303,
         "active": true,
         "budget_hours": 0.25,
         "price_per_hour": 0,
         "billable": false,
         "color": "#68BE5E",
         "users": [
            23129
         ],
         "managers": [
            23129
         ],
         "created_on": "2014-10-03T12:49:05Z",
         "updated_on": "2014-10-24T14:34:59Z"
      },
      {
         "id": 397707,
         "name": "Sample Project",
         "description": "",
         "client_id": 151304,
         "active": false,
         "budget_hours": 10,
         "price_per_hour": 30,
         "billable": true,
         "color": "#E93A55",
         "users": [
            23129,
            23130
         ],
         "managers": [
            23129
         ],
         "created_on": "2014-12-01T11:40:00Z",
         "updated_on": "2014-12-02T12:06:39Z"
      }
   ]
}
```

You can also [include related content](includes.md) when getting the list of projects.

<a name="get"></a>
## Getting a project

To get the project's info if you know the project id, make a GET request to:

* `/api/projects/[PROJECT_ID]`
 
Example of response:

```json
{
   "projects": [
      {
         "id": 397706,
         "name": "Understanding Paymo",
         "description": "",
         "client_id": 151303,
         "active": true,
         "budget_hours": 0.25,
         "price_per_hour": 0,
         "billable": false,
         "color": "#68BE5E",
         "users": [
            23129
         ],
         "managers": [
            23129
         ],
         "created_on": "2014-10-03T12:49:05Z",
         "updated_on": "2014-10-24T14:34:59Z"
      }
   ]
}
```

You can also [include related content](includes.md) when getting a project.

<a name="create"></a>
## Creating a project

To create a new project, make a POST request to:

* `/api/projects` 

with the request body containing the new project info, as in the example below:

```json
{
   "name": "New Project",
   "description": "Latest project we'll be working on",
   "billable": true,
   "client_id": 999999,
   "users": [ 123, 124 ],
   "managers": [ 123 ]
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new project. The response body will contain the new project info as in the **Getting a project** section.

If your company does not have a Paymo paid subscription and you have reached the active projects limit, you will get a `403 Error: Adding projects denied. Projects limit reached.`

### Required fields

When creating a project: `name`, `client_id`.

<a name="update"></a>
## Updating a project

To update an existing project, make a POST or PUT request to:

* `/api/projects/[PROJECT_ID]`

with the request body containing the updated info. You can send only the changed fields. 

Example of request body if you want to change the name of the project and assign new users:

```json
{
   "name": "This is the new name",
   "users": [ 123, 129, 130 ]
}
```

**Note**: for the `users` and `managers` arrays, you will have to send the new list of assigned users, not only the ids of the newly assigned users.
 
The response will return `200 OK` and will contain the updated project info as in the **Getting a project** section.

If the user does not have the rights to update the project, a `403 Forbidden` response will be returned.

<a name="archive"></a>
## Archiving or activating a project

To archive a project, make an update request with the following request body:

```json
{
   "active": false
}
```

To activate, send a `true` value.

<a name="update-tasklists-order"></a>
## Changing the order of task lists

To reorder the task lists in a project, make an update request to:

* `/api/projects/[PROJECT_ID]`

with a body similar to:

```json
{
   "tasklists_order": [ 493, 50, 128, 2, 4 ]
}
```

where `tasklists_order` is a list of task list ids in the new order.

<a name="delete"></a>
## Deleting a project

To delete a project, make a DELETE request to:

* `/api/projects/[PROJECT_ID]`

If successful, the response will have a `200 OK` status code. 

### Warning

**Deleting a project will also delete all info contained by the project: task lists and tasks, discussions, files and time entries!**

<a name="from-template"></a>
## Adding tasks from a project template

You can add the tasks and task lists from a project template when creating a project, or at a later time.

To do this, send an additional `template_id` param to the create project or update project request with the project template ID as its value.

An example of a request that creates a project and adds the tasks from a project template:

* POST `/api/projects` with the body:

```json
{
   "name": "Project from template",
   "description": "This project was created from a template",
   "billable": true,
   "client_id": 561,
   "users": [ 123, 124 ],
   "managers": [ 123 ],
   "template_id": 10
}
```

An example of a request that adds tasks from the project template:

* PUT `/api/projects/[PROJECT_ID]` with the body:

```json
{
	"template_id": 10
}
```

**A note about assigned users**

Tasks in project templates can have assigned users. If you add these tasks to a project and the list of project's assigned users does not contain all the users from the template's tasks, Paymo will assign the missing users to the project.

For example:

You have a project with users A and B assigned to that project.
And you have a project template that has some tasks assigned to user B, and some tasks assigned to another user C (not yet assigned to the project). 
When you add tasks from the project template to the project, the list of users assigned to the project will grow to: A, B and C. 

<a name="object"></a>
## The project object
 
A project object has the following attributes:

Attribute|Type|Description
---------|----|-----
id | integer | _(read-only)_ Unique project identifier
name | text | Project name 
description | text | Project description
client_id | integer | Id of the client for whom the project was created
active | boolean | If `true` the project is being active (you can add time to its tasks), otherwise it is archived (you cannot add time to its tasks)
budget_hours | decimal | Project budget in hours
price_per_hour | decimal | Price per hour for the time worked in the project (Note: if a user has a price per hour set, that price per hour will take precedence for the time worked by that user in this project).
billable | boolean | Used in reporting. If true the project is taken into account for unbilled time for a client or project.
color | text | An RGB value representing a color for the project when used in charts.
users | list | A list of ids of users assigned to the project. This list contains also the ids of the managers for this project.
managers | list | A list of ids of users that are managers for the project. It is a subset of the `users` list.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Client](clients.md) | client | parent
[Task list](tasklists.md) | tasklists | child
[Task](tasks.md) | tasks | child
[Milestone](milestones.md) | milestones | child
[Discussion](discussions.md) | discussions | child
[File](files.md) | files | child

*Note:* Time entries can be included through `tasks`, as in:

* `/api/projects/[PROJECT_ID]?include=tasks.entries`
