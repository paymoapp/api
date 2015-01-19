#Projects

##Getting projects

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

If your company does not have a Paymo paid subscription and you have reached the active projects limit, you will get a `403 Error: Adding projects denied. Projects limit reached`.

 
## Updating a project

To update an existing project, make a POST or PUT request to:

* `/api/projects/[PROJECT_ID]`

with the request body containing the updated info. You can send only the changed fields. 

Example request body if you want to change the name of the project and assign new users:

```json
{
   "name": "This is the new name",
   "users": [ 123, 129, 130 ]
}

**Note**: for the `users` and `managers` arrays, you will have to send the new list of assigned users, not only the newly assigned ones.
 
The response will return `200 OK` and will contain the updated project info as in the **Getting a project** section.

If the user does not have the rights to update the project, a `403 Forbidden` response will be returned.

### Archiving or activating a project

To archive a project, make an update request with the following request body:

```json
{
   "active": false
}
```

To activate, send a `true` value.

## Deleting a project

To delete a project, make a DELETE request to:

* `/api/projects/[PROJECT_ID]`

If successful, the response will contain a `200 OK`. 

### Warning

**Deleting a project will also delete all info contained by the project: task lists and tasks, discussions, files and time entries!**
