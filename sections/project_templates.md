# Project templates

Project templates help you create projects with a predefined set of tasks. 
The relationship between project templates and projects is bidirectional. You can create new templates from existing projects, and you can create new projects from existing templates.

A project template contains a set of task lists and tasks. Tasks from a template may also have additional data such as billing info, budget hours and assigned users. 
Other project related content such as files, discussions, comments are not present in a project template.  

* [Listing project templates](#list)
* [Getting a project template](#get)
* [Creating a project template](#create)
* [Updating a project template](#update)
* [Deleting a project template](#delete)
* [Applying a template to an existing project](#apply)
* [The project template object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Listing project templates

You can list your templates by making a GET request to:

* `/api/projecttemplates` for a list of all templates
* `/api/projecttemplates?include=projecttemplatestasklists,projecttemplatestasklists.projecttemplatestasks` for a list of project templates with the task lists and tasks info also included

Example of response:

```json
{
   "project_templates":[
      {
         "id":16137,
         "name":"Billboard design",
         "created_on":"2015-10-16T12:22:06Z",
         "updated_on":"2015-10-16T12:22:06Z"
      },
      {
         "id":16134,
         "name":"Flyer design",
         "created_on":"2015-10-16T12:21:02Z",
         "updated_on":"2015-10-16T12:21:02Z"
      }
   ]
}
```

<a name="get"></a>
## Getting a project template

To get the project template info, make a GET request to:

* `/api/projecttemplates/[TEMPLATE_ID]` for basic template info
* `/api/projecttemplates/[TEMPLATE_ID]?include=projecttemplatestasklists,projecttemplatestasklists.projecttemplatestasks` for a complete info about the template, including task lists and tasks

Example response:

```json
{
   "project_templates":[
      {
         "id":16137,
         "name":"Billboard design",
         "created_on":"2015-10-16T12:22:06Z",
         "updated_on":"2015-10-16T12:22:06Z"
      }
   ]
}
```

An example response with task lists and tasks info included:

```json
{
   "project_templates":[
      {
         "id":16135,
         "name":"Advertising campaign",
         "created_on":"2015-10-16T12:21:15Z",
         "updated_on":"2015-10-16T12:21:15Z",
         "projecttemplatestasklists":[
            {
               "id":39830,
               "name":"Social",
               "seq":0,
               "template_id":16135,
               "created_on":"2015-10-16T12:21:16Z",
               "updated_on":"2015-10-16T12:21:16Z",
               "projecttemplatestasks":[
                  {
                     "id":155954,
                     "name":"Trips",
                     "billable":false,
                     "seq":0,
                     "description":"",
                     "price_per_hour":250,
                     "budget_hours":0,
                     "tasklist_id":39830,
                     "template_id":16135,
                     "created_on":"2015-10-16T12:21:17Z",
                     "updated_on":"2015-10-16T12:21:17Z",
                     "users":[9028]
                  },
                  {
                     "id":155955,
                     "name":"Meetings",
                     "billable":true,
                     "seq":1,
                     "description":"",
                     "price_per_hour":null,
                     "budget_hours":0,
                     "tasklist_id":39830,
                     "template_id":16135,
                     "created_on":"2015-10-16T12:21:17Z",
                     "updated_on":"2015-10-16T12:21:17Z",
                     "users":[]
                  }
               ]
            }
         ]
      }
   ]
}
```

<a name="create"></a>
## Creating a project template

There are two ways to create project templates:

- from scratch. In this case, you have to add task lists and tasks yourself.
- from an existing project. The template will contain all task lists and tasks from the project

To create a project template, make a POST request to:

* `/api/projecttemplates`

with the request body containing the new template info. By default, this will create a project template with no task lists or tasks. 

Sample request body to create a template:

```json
{
	"name": "Template for Advertising Campaigns"	
}
```

To create a template from an existing project, send the ID of the project as `project_id` in the request body. For example:

```json
{
	"name": "Template for Advertising Campaigns",
	"project_id": 90033
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new project template. The response body will contain the new project template info as in the **Getting a project template** section.

### Required fields

When creating a project template: `name`.
For a complete description of all project template fields, see [project template object](#object).

### Adding task lists

To add task lists to an existing project template, make a POST request to:

* `/api/projecttemplatestasklists`

with the request body containing the task list info. You have to send the ID of the template as `template_id` in the request body. 

Example of request body:

```json
{
	"template_id": 16135,
	"name": "Design",
	"seq": 2
}
```

Required fields when creating a task list: `name`, `template_id`.

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new task list. The response body will also contain the new task list info.

### Adding tasks

To add tasks to an existing project template, make a POST request to:

* `/api/projecttemplatestasks`

with the request body containing the task info. You have to send the ID of the project template task list as `tasklist_id` in the request body. 

Example of request body:

```json
{
	"tasklist_id": 39830,
	"name": "Copywriting",
	"description": "",
	"billable": true,
	"price_per_hour": 60,
	"budget_hours": 16,
	"seq": 1,
	"users": [9029]
}
```

Required fields when creating a task list: `name`, `tasklist_id`.

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new task. The response body will also contain the new task info.

<a name="update"></a>
## Updating a project template

To update an existing project template, make a POST or PUT request to:

* `/api/projecttemplates/[TEMPLATE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the template name:

```json
{
	"name": "New template name"
}
```

### Updating a task list from a project template

To update a task list from a project template, make a POST or PUT request to:

* `/api/projecttemplatestasklists/[TASKLIST_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the task list name:

```json
{
	"name": "New task list name"
}
```

### Updating a task from a project template

To update a task from a project template, make a POST or PUT request to:

* `/api/projecttemplatestasks/[TASK_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the task's name and the assigned users:

```json
{
	"name": "New task name",
	"users": [9002, 9004]
}
```

<a name="delete"></a>
## Deleting a project template

Deleting a project template will also delete all the task lists and tasks from it, but it will have no effect on the projects that were created from this template.

To delete a project template, make a DELETE request to:

* `/api/projecttemplates/[TEMPLATE_ID]`

If successful, the response will have a `200 OK` status code.

### Deleting a task list from a project template

Deleting a task list from a project template will also delete all the tasks from this task list.

To delete a task list, make a DELETE request to:

* `/api/projecttemplatestasklists/[TASKLIST_ID]`

If successful, the response will have a `200 OK` status code.

### Deleting a task from a project template

To delete a task, make a DELETE request to:

* `/api/projecttemplatestasks/[TASK_ID]`

If successful, the response will have a `200 OK` status code.

<a name="apply"></a>
## Applying a template to an existing project

By applying a template to a project you can add all the tasks and task lists from the project template to the respective project.
This will not replace or remove any existing tasks from the project.

For more info about how to apply a project template to a project, see [Adding tasks from a project template](projects.md#from-template) in the Projects section.

<a name="object"></a>
## The project template object

A project template object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique template identifier
name | text | Template name
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project template was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project template was last updated

### The project template task list object

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique project template task list identifier
name | text | Task list name
seq | integer | Position (order) of the task list in the project template
template_id | integer | _(read-only)_ Project template id
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task list was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task list was last updated

### The project template task object

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique task identifier
name | text | Task name
template_id | integer | _(read-only)_ Project template id
tasklist_id | integer | Project template task list id
seq | integer | Position (order) of the task in the task list
description | text | Task description
billable | boolean | If `true` the task is billable.
budget_hours | decimal | Number of budget hours for the task
price_per_hour | decimal | Price per hour 
users | list | List of user ids that are assigned to the task.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the task was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

### For project templates

Object type|Include key|Relationship
-----------|-----------|----
[Project template task list](projecttemplates.md) | projecttemplatetasklists | child
[Project template task](projecttemplates.md) | projecttemplatetasks | child

### For project templates task lists

Object type|Include key|Relationship
-----------|-----------|----
[Project template](projecttemplates.md) | projecttemplate | parent
[Project template task](projecttemplates.md) | projecttemplatetasks | child

### For project templates tasks

Object type|Include key|Relationship
-----------|-----------|----
[Project template](projecttemplates.md) | projecttemplate | parent
[Project template task list](projecttemplates.md) | projecttemplatetasklist | parent
