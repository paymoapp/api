# Webhooks

* [Events](#events)
* [Listing webhooks](#list)
* [Getting a webhook](#get)
* [Creating a webhook](#create)
* [Wildcard events](#wildcard)
* [Webhook signatures](#signature)
* [Updating a webhook](#update)
* [Deleting a webhook](#delete)
* [Notifications](#notifications)
* [Webhook headers](#headers)
* [Additional includes](#includes)

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
- model.insert.Milestone
- model.update.Milestone
- model.delete.Milestone

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
      "where": null,
      "created_on": "2017-01-04T13:39:40Z",
      "updated_on": "2017-01-04T13:39:40Z"
    },
    {
      "id": 2,
      "target_url": "https://myapp.com/paymo-delete-task-hook",
      "last_status_code": null,
      "event": "model.delete.Task",
      "where": "project_id=123456",
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
      "where": null,
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

By providing the `where` param you can trigger webhooks only if the model matches the conditions from `where`.
The `where` param has the same syntax as when used in `where` params of `GET` requests. See [response filtering](filtering.md).

For example, you want to be notified only for new task event in a specific project. The create request for this webhook will look like:

```json
{
   "target_url": "https://myapp.com/paymo/project-123-new-tasks",
   "event": "model.insert.Task",
   "where": "project_id=123"
}
```

<a name="wildcard"></a>
## Wildcard events

When creating a webhook, you can also use a wildcard for the webhook event using the `*` symbol.

For example, a webhook created with:

* `event`=`*` will be triggered every time any event from the [list](#events) occurs.
* `event`=`model.insert.*` will be triggered every time an insert event occurs.
* `event`=`*.Task` will be triggered every time an insert/update/delete event for a task occurs.

When using wildcard events, you can distinguish between event types by using the
`X-Paymo-Event` header to get the actual event that triggered the webhook. (See [headers](#headers))

*Notice:* When using `where` with wildcard events, the validity of the `where` param will not be
checked when creating the webhook. It will be checked against an actual event when the event will occur.
In case the `where` param could not be parsed the webhook will not be triggered.

<a name="signature"></a>
## Webhook signatures

When creating a webhook you can also provide a `secret` param.
In this case Paymo will sign this webhook requests so you can verify that they originated from Paymo.
This `secret` value will not be returned when listing webhooks or getting webhook details.

These webhook triggers will contain a HTTP header `X-Paymo-Signature` which is the
HMAC hex digest of the response body generated using the `sha1` hash function and the `secret` as the HMAC key.

For example, a delete project webhook created with `secret`="secret" will have the header:

```
X-Paymo-Signature: sha1=dc03736e396e70138bf7af4ffaa2948cde42dcf1
```

for the body:

```
{"id":"1679584"}
```

<a name="update"></a>
## Updating a webhook

To update an existing webhook, make a POST or PUT request to:

* `/api/hooks/[WEBHOOK_ID]`

with the request body containing the updated info. You can send only the changed fields.

On update the webhook's `last_response_code` will be reset.

Example of request body if you want to change the webhook `target_url`:

```json
{
    "target_url": "https://myotherapp.com/notifications"
}
```

The response will return `200 OK` and will contain the updated webhook info.

<a name="delete"></a>
## Deleting a webook

By deleting a webhook, you will stop receiving notifications for the events specified in the webhook.

To delete a webhook, send a DELETE request to:

* `/api/hooks/[WEBHOOK_ID]`

If successful, the response will have a `200 OK` status code.

A webhook is also deleted when `target url` responds with a status code of `410 Gone`.

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

<a name="headers"></a>
## Webhook Headers
Any request by Paymo to a target URL triggered by a webhook will have additional headers:

* `X-Paymo-Webhook` with the ID of the webhook which is triggered
* `X-Paymo-Event` with the event that was triggered (e.g. `model.insert.Task`)
* `X-Paymo-Signature` with the HMAC hash of the request body when the webhook was created with a `secret`

<a name="includes"></a>
## Additional includes in webhook notification body

Object type|Equivalent request
-----------|-----------
[Client](clients.md#get) | `/clients/[CLIENT_ID]`
[Project](projects.md#get) | `/projects/[PROJECT_ID]?include=client.name`
[Task List](tasklists.md#get) | `/tasklists/[TASKLIST_ID]?include=project.name`
[Task](tasks.md#get) | `/tasks/[TASK_ID]?include=*,progress_status,project.name,tasklist.name`
[Invoice](invoices.md#get) | `/invoices/[INVOICE_ID]?include=invoiceitems,client.name`
[Time Entry](entries.md#get) | `/entries/[ENTRY_ID]?include=task.name,user.name`
[Milestone](milestones.md#get) | `/milestones/[MILESTONE_ID]?include=project.name`
