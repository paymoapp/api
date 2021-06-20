# Workflows

A project workflow is a set of possible statuses for the project's tasks.

* [Getting workflows](#list)
* [Getting a workflow](#get)
* [Creating a workflow](#create)
* [Updating a workflow](#update)
* [Deleting a workflow](#delete)
* [The workflow object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting workflows

You can list workflows by making a GET request to:

* `/api/workflows` for a list of all workflows in your company
* `/api/workflows?include=workflowstatuses` for a list of all workflows with the corresponding workflow statuses

Example of response:

```json
{
    "workflows":
    [
        {
            "id": 1,
            "name": "Dev Workflow",
            "is_default": true,
            "created_on": "2018-08-30T08:49:55Z",
            "updated_on": "2018-08-30T08:52:37Z"
        },
        {
            "id": 2,
            "name": "Basic",
            "is_default": false,
            "created_on": "2018-11-12T13:14:06Z",
            "updated_on": "2018-11-12T13:14:06Z"
        }
    ]
}
```

You can also [include related content](includes.md) when listing workflows.

<a name="get"></a>
## Getting a workflow

To get the workflow's info make a GET request to:

* `/api/workflows/[WORKFLOW_ID]`
 
Example of response:

```json
{
   "workflows": [
       {
            "id": 2,
            "name": "Basic",
            "is_default": false,
            "created_on": "2018-11-12T13:14:06Z",
            "updated_on": "2018-11-12T13:14:06Z"
        }
   ]
}
```

You can also [include related content](includes.md) when getting a workflow.


<a name="create"></a>
## Creating a workflow

To create a workflow, make a POST request to:

* `/api/workflows`

with the request body containing the new workflow info, as in the example below:

```json
{
    "name": "Design"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new workflow. The response body will contain the new workflow info as in the **Getting a workflow** section.

Each new workflow will be created with two default statuses: `Backlog` and `Complete`. To add more statuses see [workflow statuses](workflow_statuses.md#create).

**Note**: Adding new workflows is not available for free accounts.

### Required fields

When creating a workflow: `name`.

<a name="update"></a>
## Updating a workflow

To update an existing workflow, make a POST or PUT request to:

* `/api/workflows/[WORKFLOW_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the workflow name:

```json
{
    "name": "Development"
}
```

<a name="delete"></a>
## Deleting a workflow

To delete a workflow, make a DELETE request to:

* `/api/workflows/[WORKFLOW_ID]`

If successful, the response will have a `200 OK` status code.

### Warning

**You cannot delete a workflow that has involved projects!**

<a name="object"></a>
## The workflow object

A workflow object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique workflow identifier
name | text | Workflow name
is_default | boolean | Is this workflow the default one for new projects
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when 
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when 

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):


Object type|Include key|Relationship
-----------|-----------|----
[Workflow Statuses](workflow_statuses.md) | workflowstatuses | child
