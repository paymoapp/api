# Filtering 

If you make a GET request to retrieve a list of objects but you want the response to contain only those items that match a certain criteria, you should use the `where` param in the query string.

Let's say want to get a list of tasks that are not yet marked as complete.

The request would be:

```shell
curl -u email:password
  -H 'Accept: application/json'
  https://app.paymoapp.com/api/tasks?where=complete=false
```

And the response looks like:

```json
{
   "tasks": [
      {
         "id": 241147,
         "name": "Logo",
         "project_id": 28917,
         "tasklist_id": 59917,
         "user_id": null,
         "complete": false,
         "billable": true,
         "seq": 1,
         "description": "",
         "price_per_hour": null,
         "due_date": "2013-09-25",
         "budget_hours": 80,
         "users": [
            1563
         ],
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2014-07-23T14:22:05Z"
      },
      {
         "id": 241148,
         "name": "HTML coding",
         "project_id": 28917,
         "tasklist_id": 59918,
         "user_id": null,
         "complete": false,
         "billable": true,
         "seq": 4,
         "description": "",
         "price_per_hour": null,
         "due_date": "2013-09-11",
         "budget_hours": 60,
         "users": [
            1570
         ],
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2014-07-23T14:22:05Z"
      }
   ]
}
```

You can add multiple conditions in the `where` param by using the `and` operator. As in the example below:

```shell
curl -u email:password
  -H 'Accept: application/json'
  https://app.paymoapp.com/api/tasks?where=complete=false and billable=true
```

**Note**: the value of the `where` param will be urlencoded, but in the examples here we'll not do that to keep the text clear.

In the example above, the URL should look like this: `https://app.paymoapp.com/api/tasks?where=complete%3Dfalse%20and%20billable%3Dtrue`

## Available operators

Operators used in `where` condition are: `=`, `>`, `>=`, `<`, `<=`, `!=`, `like`, `not like`, `in (value1,value2,...)`, `not in (value1, value2)`

Examples of `where` conditions (not urlencoded for clarity):

* `client_id in (123,124)`
* `name like Sample`
* `name="Sample Project"`
* `price_per_hour>50`



