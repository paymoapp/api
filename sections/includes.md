#Including related content

Let's say you know the task ID and you want to get the task info together with the project name (in which the task is) and client name (for whom the project was created).

Usually, what you do is:

* Get the complete task info. That will include the project id.
* Get the project info. That will get you the desired project name and the client id.
* Get the client info, in which you finally get the client name, the last piece of the puzzle.

In Paymo 3 API you can get all that data in a single API request by using `include` param to the request.

Example:

```curl
curl -u email:password
  -H 'Accept: application/json'
  https://app.paymoapp.com/api/tasks/241147?include=project.name,project.client.name
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
         "updated_on": "2014-07-23T14:22:05Z",
         "project": {
            "name": "Best Buy Website - small changes",
            "client": {
               "name": "Best Buy Co., Inc."
            }
         }
      }
   ]
}
```

You can include the entire related object info:

```curl
curl -u email:password
  -H 'Accept: application/json'
  https://app.paymoapp.com/api/tasks/241147?include=project
```

The response looks like:

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
         "updated_on": "2014-07-23T14:22:05Z",
         "project": {
            "id": 28917,
            "name": "Best Buy Website - small changes",
            "description": "",
            "client_id": 10875,
            "active": false,
            "budget_hours": 700,
            "price_per_hour": 90,
            "billable": false,
            "color": null,
            "users": [
               1564,
               1647
            ],
            "managers": [
               1647
            ],
            "created_on": "2013-06-26T12:07:44Z",
            "updated_on": "2015-01-09T13:40:15Z"
         }
      }
   ]
}
```

Say you have the project ID and you want to list all task lists from that project and all tasks from those task lists. 
You can do it with the following request:

```curl
curl -u email:password
  -H 'Accept: application/json'
  https://app.paymoapp.com/api/tasks/241147?include=tasklists,tasklists.tasks
```

The response will look like:

```json
{
   "projects": [
      {
         "id": 28917,
         "name": "Best Buy Website - small changes",
         "description": "",
         "client_id": 10875,
         "active": false,
         "budget_hours": 700,
         "price_per_hour": 90,
         "billable": false,
         "color": null,
         "users": [
            1564,
            1647
         ],
         "managers": [
            1647
         ],
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2015-01-09T13:40:15Z",
         "tasklists": [
            {
               "id": 59917,
               "name": "Design",
               "project_id": 28917,
               "seq": 2,
               "milestone_id": 7939,
               "created_on": "2013-06-26T12:07:44Z",
               "updated_on": "2014-07-23T14:22:05Z",
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
                     "id": 266875,
                     "name": "Header",
                     "project_id": 28917,
                     "tasklist_id": 59917,
                     "user_id": 1562,
                     "complete": false,
                     "billable": true,
                     "seq": 2,
                     "description": "",
                     "price_per_hour": null,
                     "due_date": "2013-09-18",
                     "budget_hours": 35,
                     "users": [
                        1563
                     ],
                     "created_on": "2013-07-25T11:18:54Z",
                     "updated_on": "2014-07-23T14:22:05Z"
                  },
                  {
                     "id": 266876,
                     "name": "Mobile version",
                     "project_id": 28917,
                     "tasklist_id": 59917,
                     "user_id": 1562,
                     "complete": false,
                     "billable": true,
                     "seq": 3,
                     "description": "",
                     "price_per_hour": null,
                     "due_date": "2013-10-25",
                     "budget_hours": 100,
                     "users": [
                        1569
                     ],
                     "created_on": "2013-07-25T11:19:07Z",
                     "updated_on": "2014-07-23T14:22:05Z"
                  }
               ]
            },
            {
               "id": 59918,
               "name": "Coding",
               "project_id": 28917,
               "seq": 3,
               "milestone_id": null,
               "created_on": "2013-06-26T12:07:44Z",
               "updated_on": "2014-07-23T14:22:05Z",
               "tasks": [
                  {
                     "id": 241148,
                     "name": "HTML coding",
                     "project_id": 28917,
                     "tasklist_id": 59918,
                     "user_id": null,
                     "complete": false,
                     "billable": true,
                     "seq": 1,
                     "description": "",
                     "price_per_hour": null,
                     "due_date": "2013-09-11",
                     "budget_hours": 60,
                     "users": [
                        1570
                     ],
                     "created_on": "2013-06-26T12:07:44Z",
                     "updated_on": "2014-07-23T14:22:05Z"
                  },
                  {
                     "id": 266874,
                     "name": "Testing",
                     "project_id": 28917,
                     "tasklist_id": 59918,
                     "user_id": 1562,
                     "complete": false,
                     "billable": true,
                     "seq": 2,
                     "description": "",
                     "price_per_hour": null,
                     "due_date": "2013-10-30",
                     "budget_hours": null,
                     "users": [
                        1564
                     ],
                     "created_on": "2013-07-25T11:18:11Z",
                     "updated_on": "2014-07-23T14:22:05Z"
                  }
               ]
            }
         ]
      }
   ]
}
```

