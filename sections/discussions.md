# Discussions

* [Getting discussions](#list)
* [Getting a discussion](#get)
* [Creating a discussion](#create)
* [Updating a discussion](#update)
* [Adding a file to a discussion](#add-file)
* [Deleting a discussion](#delete)
* [The discussion object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting discussions

You can list discussions by making a GET request to:

* `/api/discussions` for a list of all the discussions
* `/api/discussions?where=project_id=[PROJECT_ID]` for a list of discussions from a project
* `/api/discussions?where=user_id=[USER_ID]` for a list of discussions started by a user
 
Example of response:

```json
{
    "discussions": [
        {
            "id": 10983,
            "name": "Preliminary research",
            "description": "We need to define exactly all the steps required for this preliminary research.",
            "project_id": 347452,
            "user_id": 1563,
            "created_on": "2014-10-01T12:04:07Z",
            "updated_on": "2014-10-01T12:11:05Z"
        },
        {
            "id": 9879,
            "name": "EA design",
            "description": "Who has access to the old EA Games design?",
            "project_id": 347452,
            "user_id": 1647,
            "created_on": "2014-07-23T14:22:05Z",
            "updated_on": "2014-07-23T14:22:05Z"
        }
    ]
}
```

You can also [include related content](includes.md) when listing discussions.

<a name="get"></a>
## Getting a discussion

To get the discussion info, make a GET request to:

* `/api/discussions/[DISCUSSION_ID]`
* `/api/discussions/[DISCUSSION_ID]?include=files` for discussion info with a list of attached files 
* `/api/discussions/[DISCUSSION_ID]?include=thread.comments` for discussion info with a list of discussion comments

Example response:

```json
{
    "discussions": [
        {
            "id": 10983,
            "name": "Preliminary research",
            "description": "We need to define exactly all the steps required for this preliminary research.",
            "project_id": 347452,
            "user_id": 1563,
            "created_on": "2014-10-01T12:04:07Z",
            "updated_on": "2014-10-01T12:11:05Z"
        }
    ]
}
```

You can also [include related content](includes.md) when getting a discussion.

<a name="create"></a>
## Creating a discussion

To create a discussion, make a POST request to:

* `/api/discussions`

with the request body containing the new discussion info, as in the example below:

```json
{
    "name": "Where do we start?"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new discussion. The response body will contain the new discussion info as in the **Getting a discussion** section.

### Required fields

When creating a discussion: `name`, `project_id`.

<a name="update"></a>
## Updating a discussion

To update an existing discussion, make a POST or PUT request to:

* `/api/discussions/[DISCUSSION_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the discussion due date:

```json
{
    "description": "All required information should be posted in here"
}
```

The response will return `200 OK` and will contain the updated discussion info as in the **Getting a discussion** section.

<a name="add-file"></a>
## Adding a file to a discussion

To add a file to a discussion, make a POST request to:

* `/api/discussions/[DISCUSSION_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `file`. Here's an example using `curl` command line:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@plan.doc"
  https://app.paymoapp.com/api/discussions/12345
```

The file can also be added when creating the discussion. In that case, all the discussion fields should be send in `multipart-form-data` format together with the file.

<a name="delete"></a>
## Deleting a discussion

To delete a discussion, make a DELETE request to:

* `/api/discussions/[DISCUSSION_ID]`

If successful, the response will have a `200 OK` status code.

### Warning

**Deleting a discussion will also delete all comments from that discussion!**

<a name="object"></a>
## The discussion object

A discussion object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique discussion identifier
name | text | Discussion name
description | html | Discussion description
project_id | integer | Id of the project the discussion is about
user_id | integer | _(read-only)_ Id of the user that started the discussion
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the discussion was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the discussion was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[User](users.md) | user | parent
[Comments thread](comments.md) | thread | parent
[File](files.md) | files | child
