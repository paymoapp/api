# Webhooks

* [Events](#events)
* [Listing webhooks](#list)
* [Getting a webhook](#get)
* [Creating a webhook](#create)
* [Deleting a webhook](#delete)
* [Notifications](#notifications)

Webhooks allow for 3rd parties to be notified when an event in Paymo occurs.

<a name="events"></a>
At the moment, the following events can be hooked:

- model.insert.Client
- model.update.Client
- model.delete.Client
- model.insert.Project
- model.update.Project
- model.delete.Project
- model.insert.Tasklist
- model.update.Tasklist
- model.delete.Tasklist
- model.insert.Task
- model.update.Task
- model.delete.Task
- model.insert.Invoice
- model.update.Invoice
- model.delete.Invoice
- model.insert.Entry
- model.update.Entry
- model.delete.Entry

<a name="list"></a>
## Listing webhooks

You can list your own webhooks by making a GET request to:

* `/api/hooks`

Example of response:

```json
{
  "hooks": [
    {
      "id": 1,
      "target_url": "https://myapp.com/paymo-insert-task-hook",
      "last_status_code": null,
      "event": "model.insert.Task",
      "created_on": "2017-01-04T13:39:40Z",
      "updated_on": "2017-01-04T13:39:40Z"
    },
    {
      "id": 2,
      "target_url": "https://myapp.com/paymo-delete-task-hook",
      "last_status_code": null,
      "event": "model.delete.Task",
      "created_on": "2017-01-04T13:40:11Z",
      "updated_on": "2017-01-04T13:40:11Z"
    }
  ]
}
```


<a name="get"></a>
## Getting a webhook

To get the webhook info, make a GET request to:

* `/api/hooks/[WEBHOOK_ID]`

Example response:

```json
{
  "hooks": [
    {
      "id": 1,
      "target_url": "https://myapp.com/paymo-insert-task-hook",
      "last_status_code": 200,
      "event": "model.insert.Task",
      "created_on": "2017-01-04T13:39:40Z",
      "updated_on": "2017-01-04T13:39:40Z"
    }
  ]
}
```

<a name="create"></a>
## Creating a webhook

To create a webhook, make a POST request to:

* `/api/hooks`

with the request body containing the new webhook info as in the example below:

```json
{
   "target_url": "https://myapp.com/paymo/notifications",
   "event": "model.insert.Task"
}
```

If successful, the response will contain the new webhook info.

<a name="delete"></a>
## Deleting a webook

By deleting a webhook, you will stop receiving notifications for the events specified in the webhook.

To delete a webhook, send a DELETE request to:

* `/api/hooks/[WEBHOOK_ID]`

If successful, the response will have a `200 OK` status code.

<a name="notifications"></a>
## Notifications

When an [event](#events) occurs, Paymo will notify all webhooks that match the following criteria:

- webhook event matches occured event
- webhook was created by a user that has `access` rights to the object from the event

Paymo makes a webhook notification by making a POST request to the webhook URL, where the request

- has header `Content-type: application/json`
- has body equal to a JSON representation of the object from the event.

For example, if the hook was created with:

```json
{
  "event": "model.insert.Task",
  "target_url": "https://app.com/notifications"
}
```

when a task is created, and the user that created the hook has the rights to view the task, Paymo will make a POST request to `https://app.com/notifications` with a body similar to:

```json
{
   "id":109403,
   "name":"New Task",
   "project_id":59032,
   "tasklist_id":250019,
   "user_id":1093,
   "complete":false,
   "billable":true,
   "flat_billing":false,
   "seq":1,
   "description":"",
   "price_per_hour":null,
   "estimated_price":null,
   "price":null,
   "invoiced":false,
   "invoice_item_id":null,
   "due_date":null,
   "start_date":null,
   "budget_hours":null,
   "users":[
      1093
   ],
   "created_on":"2016-09-29T09:46:55Z",
   "updated_on":"2016-09-29T09:46:55Z",
   "files_count":0,
   "comments_count":0,
   "project":{
      "name":"AT&T Flyer Design"
   },
   "tasklist":{
      "name":"Planning"
   }
}
```

For `insert` and `update` events, the JSON object representation is mostly the same as the response you get by making a GET request to `/api/tasks/[TASK_ID]`, except

- There is no `tasks` parent node in the response. The task object is at the root of JSON.
- There are additional attributes like `project` and `tasklist`, as in the GET request to `/api/tasks/[TASK_ID]?include=project.name,tasklist.name`

For `delete` events, the notification content is a JSON object with a single attribute: the ID of the object that was deleted. For example:

```json
{
    "id": 109404
}
```

### Additional includes in webhook notification body

Object type|Equivalent request
-----------|-----------|----
[Client](clients.md#get) | `/clients/[CLIENT_ID]`
[Project](projects.md#get) | `/projects/[PROJECT_ID]?include=client.name`
[Task List](tasklists.md#get) | `/tasklists/[TASKLIST_ID]?include=project.name`
[Task](tasks.md#get) | `/tasks/[TASK_ID]?include=project.name,tasklist.name`
[Invoice](invoices.md#get) | `/invoices/[INVOICE_ID]?include=invoiceitems,client.name`
[Time Entry](entries.md#get) | `/entries/[ENTRY_ID]?include=task.name,user.name`
