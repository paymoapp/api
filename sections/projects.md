# Projects

* [Getting projects](#list)
* [Getting a project](#get)
* [Creating a project](#create)
* [Updating a project](#update)
* [Archiving or activating a project](#archive)
* [Changing the order of task lists](#update-tasklists-order)
* [Deleting a project](#delete)
* [Adding tasks from a project template](#from-template)
* [Billing](#billing)
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
         "status_id": 93939,
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
         "status_id": 83821,
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
         "status_id": 1922,
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

<a name="billing"></a>
## Project Billing

There are three types of projects in Paymo:

* *Time and materials* - these are generally used for service contracts or any other type of work in which the client agrees to pay the contractor based upon the time spent to perform the work, and for materials/expenses incurred during the project.
* *Flat rate* - used when the client agrees to pay the contractor a lump sum for fulfillment of the project (no matter how much time is spent in order to deliver the project).
* *Non-billable* - for projects that you’re not going to bill (e.g. internal projects).

### Time and materials projects

A time & materials project can have three types of tasks: *time-based* tasks, *flat rate* tasks and *non-billable* tasks.
The time-based tasks are based upon time spent to perform the work, the flat rate tasks have a fixed price associated with them and non-billable tasks for activities that won’t be invoiced.

Defining fields for time & materials projects:

* `billable` will be `true`
* `flat_billing` will be `false`
* `price_per_hour` will be the project hourly rate
* `hourly_billing_mode` will define the order in which the hourly rates (user rate, task rate, project rate, or company rate) will be selected for billing the project time. If an hourly rate is not set, the next set value will be used.
 Available options:
 * `null` or `user`, first set value from the list will be used: user hourly rate, then task rate, then project rate, then company rate.
 * `task`, first set value from the list: task hourly rate, then user rate, then project rate, then company rate.
 * `project`, first set value from the list: project hourly rate, then user rate, then task rate, then company rate.
 * `company`, first set value from the list: company hourly rate, then user rate, then task rate, then project rate.

Example request to create a time & materials project:

* POST `/api/projects` with the body:

```json
{
    "name": "Time and materials project",
    "billable": true,
    "flat_billing": false,
    "price_per_hour": 50.00,
    "hourly_billing_mode": "project"
}
```

### Flat rate projects

Defining fields for flat rate projects:

* `billable` will be `true`
* `flat_billing` will be `true`
* `price` will be the project flat rate

Example request to create a flat rate project:

* POST `/api/projects` with the body:

```json
{
    "name": "Flat rate project",
    "billable": true,
    "flat_billing": true,
    "price": 2000.00
}
```

### Non-billable projects

For non-billable projects:

* `billable` will be `false`
* all other billing related fields will be ignored

More info about project billing can be found in the [Knowledge Base](https://www.paymoapp.com/knowledge-base/types-of-projects/).

<a name="object"></a>
## The project object
 
A project object has the following attributes:

Attribute|Type|Description
---------|----|-----
id | integer | _(read-only)_ Unique project identifier
name | text | Project name 
description | text | Project description
client_id | integer | Id of the client for whom the project was created
status_id | integer | Status id
active | boolean | If `true` the project is being active (you can add time to its tasks), otherwise it is archived (you cannot add time to its tasks)
color | text | An RGB value representing a color for the project when used in charts.
users | list | A list of ids of users assigned to the project. This list contains also the ids of the managers for this project.
managers | list | A list of ids of users that are managers for the project. It is a subset of the `users` list.
billable | boolean | If `true` the project is billable. See [billing](#billing).
flat_billing | boolean | For billable projects, if `true` the project is *flat rate*, otherwise the project is *time & materials*. See [billing](#billing).
price_per_hour | decimal | For time & materials projects, the project hourly rate. Note: which hourly rate (user, task, project, or company) will be used for billing is defined by the `hourly_billing_mode` field.
price | decimal | For flat rate project, the project flat rate. See [billing](#billing).
estimated_price | decimal | For billable projects, the estimated project price consisting of the price of all its billable tasks (including flat rate tasks).
hourly_billing_mode | text | For time & materials projects, defines the hierarchy of rates used when deciding on the hourly rate for billing the time in the project. See [billing](#billing).
budget_hours | decimal | Project budget in hours. If not set, the project will have unlimited budget hours.
adjustable_hours | boolean | If `true` the budget_hours will be adjusted automatically based on tasks budget hours.
invoiced | boolean | For flat rate projects, if `true`, the project was already invoiced.
invoice_item_id | integer | For flat rate projects, if set, the ID of the invoice line (part of the invoice for the project).
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Client](clients.md) | client | parent
[Project status](project_statuses.md) | projectstatus | parent
[Task list](tasklists.md) | tasklists | child
[Task](tasks.md) | tasks | child
[Milestone](milestones.md) | milestones | child
[Discussion](discussions.md) | discussions | child
[File](files.md) | files | child
[Invoice Item](invoices.md) | invoiceitem | parent

*Note:* Time entries can be included through `tasks`, as in:

* `/api/projects/[PROJECT_ID]?include=tasks.entries`
