# Sessions

* [Getting sessions](#list)
* [Getting a session](#get)
* [Creating a session](#create)
* [Deleting a session](#delete)

Sessions are used for authentication as described in [Authentication Guide](authentication.md#sessions). 

<a name="list"></a>
## Getting sessions

You can list sessions for the current user by making a GET request to:

* `/api/sessions` 
 
Example of response:

```json
{
    "sessions": [       
         {
            "id": "1762c607ec2b3e9e13c323cbafeb7ecd",
            "ip": "10.0.2.2",
            "expires_on": "2015-02-16T13:54:41Z",
            "created_on": "2015-01-16T13:54:41Z",
            "updated_on": "2015-01-16T13:54:41Z",
            "user_id": 1
         },
         {
            "id": "13ad2ecdb6d59343fa25214c35e9430e",
            "ip": "212.93.154.90",
            "expires_on": "2015-02-07T10:03:33Z",
            "created_on": "2015-01-07T10:03:33Z",
            "updated_on": "2015-01-07T10:03:33Z",
            "user_id": 1
         }
    ]
}     
```

<a name="get"></a>
## Getting a session

To get the session info, make a GET request to:

* `/api/sessions/[SESSION_ID]`

Example response:

```json
{
    "sessions": [       
         {
            "id": "1762c607ec2b3e9e13c323cbafeb7ecd",
            "ip": "10.0.2.2",
            "expires_on": "2015-02-16T13:54:41Z",
            "created_on": "2015-01-16T13:54:41Z",
            "updated_on": "2015-01-16T13:54:41Z",
            "user_id": 1
         }
    ]
}     
```

<a name="create"></a>
## Creating a session

To create a session, make a POST request with an empty body to:

* `/api/sessions`

The response will contain the new session info.

<a name="delete"></a>
## Ending a session

To end a session, send a DELETE request to:

* `/api/sessions/[SESSION_ID]`

If successful, the response will have a `200 OK` status code.