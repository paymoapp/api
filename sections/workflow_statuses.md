# Workflow statuses

* [Getting workflow statuses](#list)
* [Getting a workflow status](#get)
* [Creating a workflow status](#create)
* [Updating a workflow status](#update)
* [Deleting a workflow status](#delete)
* [The workflow status object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting workflow statuses

You can list workflow statuses by making a GET request to:

* `/api/workflowstatuses` for a list of all workflow statuses from all workflows
* `/api/workflowstatuses?where=workflow_id=[WORKFLOW_ID]` for a list of workflow statuses for a specific workflow

Example of response:

```json
{
   "workflowstatuses": [
      {
         "id": 1,
         "workflow_id": 1,
         "name": "Backlog",
         "color": null,
         "action": "backlog",
         "created_on": "2018-12-04T13:22:36Z",
         "updated_on": "2018-12-04T13:22:36Z"
      },
      {
         "id": 2,
         "workflow_id": 1,
         "name": "To Do",
         "color": "5BDBF6",
         "action": "",
         "created_on": "2018-12-04T13:22:36Z",
         "updated_on": "2018-12-04T13:22:36Z"
      },
      {
         "id": 3,
         "workflow_id": 1,
         "name": "In progress",
         "color": "FFB855",
         "action": "",
         "created_on": "2018-12-04T13:22:36Z",
         "updated_on": "2018-12-04T13:22:36Z"
      },
      {
         "id": 4,
         "workflow_id": 1,
         "name": "Complete",
         "color": "3E993C",
         "action": "complete",
         "created_on": "2018-12-04T13:22:36Z",
         "updated_on": "2018-12-04T13:22:36Z"
      }
   ]
}
```

You can also [include related content](includes.md) when listing workflow statuses.

<a name="get"></a>
## Getting a workflow status

To get the workflow status info, make a GET request to:

* `/api/workflowstatuses/[WORKFLOW_STATUS_ID]`

Example response:

```json
{  
   "workflowstatuses":[  
      {  
         "id":1,
         "workflow_id":1,
         "name":"Backlog",
         "color":null,
         "action":"backlog",
         "created_on":"2018-11-21T08:29:15Z",
         "updated_on":"2018-11-21T08:29:15Z"
      }
   ]
}
```

You can also [include related content](includes.md) when getting a workflow status.

<a name="create"></a>
## Creating a workflow status

To create a workflow status, make a POST request to:

* `/api/workflowstatuses`

```json
{
    "name": "New Workflow Status",
    "color": "FF0000",
    "workflow_id": 1
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new workflow status. The response body will contain the new workflow status info as in the **Getting a workflow status** section.

### Required fields

When creating a workflow status: `name`, `color`, `workflow_id`.

<a name="update"></a>
## Updating a workflow status

To update an existing workflow status, make a POST or PUT request to:

* `/api/workflowstatuses/[WORKFLOW_STATUS_ID]`

with the request body containing the updated info. You can send only the changed fields. 

Example of request body if you want to change the name of the workflow status:

```json
{
   "name": "This is the new name"
}
```
 
The response will return `200 OK` and will contain the updated workflow status info as in the **Getting a workflow status** section.

<a name="delete"></a>
## Deleting a workflow status

To delete a workflow status, make a DELETE request to:

* `/api/workflowstatuses/[WORKFLOW_STATUS_ID]`

If successful, the response will have a `200 OK` status code. 

**You cannot delete a workflow status that has involved tasks!**

<a name="object"></a>
## The workflow status object
 
A workflow status object has the following attributes:

Attribute|Type|Description
---------|----|-----
id | integer | _(read-only)_ Unique workflow status identifier
name | text | Workflow status name 
workflow_id | integer | The workflow id for whom the workflow status was created
color | text | An RGB value representing a color for the workflow status when used in board.
seq | integer | _(read-only)_ Position (order) of the workflow status in the workflow
action | text | _(read-only)_ An identifier for the Backlog and Complete statuses
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the workflow status was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the workflow status was last updated


<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Workflow](workflows.md) | workflow | parent
