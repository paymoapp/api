# Comments

* [Getting comments](#list)
* [Getting a comment](#get)
* [Creating a comment](#create)
* [Updating a comment](#update)
* [Attaching a file to a comment](#add-file)
* [Deleting a comment](#delete)
* [The comment object](#object)
* [Dependent objects](#dependencies)

In Paymo 3 you can comment on discussions, tasks and files. Each comment belongs to a comments thread.  

<a name="list"></a>
## Getting comments

You can list comments by making a GET request to:

* `/api/threads?where=project_id=[PROJECT_ID]` for a list of comment threads from a project (may be related to a discussion, a task or a file)
* `/api/threads?where=task_id=[TASK_ID]&include=comments` for a list of comments on a task
* `/api/threads?where=discussion_id=[DISCUSSION_ID]&include=comments` for a list of comments on a discussion
* `/api/threads?where=file_id=[FILE_ID]&include=comments` for a list of comments on a file
* `/api/comments?where=thread_id=[THREAD_ID]` for a list of comments in a comments thread
 
Example of response:

```json
{
    "threads": [
        {
            "id": 79885,
            "project_id": 397709,
            "task_id": 3419186,
            "created_on": "2015-01-26T15:06:06Z",
            "updated_on": "2015-01-26T15:06:17Z",
            "comments": [
                {
                    "id": 125236,
                    "thread_id": 79885,
                    "user_id": 23129,
                    "content": "Please change the form submit button positioning as in the new design.",
                    "created_on": "2015-01-26T15:06:06Z",
                    "updated_on": "2015-01-26T15:06:06Z"
                },
                {
                    "id": 125237,
                    "thread_id": 79885,
                    "user_id": 23129,
                    "content": "See the attached file for the new design.",
                    "created_on": "2015-01-26T15:06:17Z",
                    "updated_on": "2015-01-26T15:06:17Z"
                }
            ]
        }
    ]
}
```

or

```json
{
    "comments": [
        {
            "id": 125234,
            "thread_id": 79884,
            "user_id": 23129,
            "content": "See this description",
            "created_on": "2015-01-26T14:51:41Z",
            "updated_on": "2015-01-26T14:51:41Z"
        },
        {
            "id": 125235,
            "thread_id": 79884,
            "user_id": 23129,
            "content": "map",
            "created_on": "2015-01-26T14:52:04Z",
            "updated_on": "2015-01-26T14:52:04Z"
        }
    ]
}
```

You can also [include related content](includes.md) when listing comments.

<a name="get"></a>
## Getting a comment

To get the comment info, make a GET request to:

* `/api/comments/[COMMENT_ID]`
* `/api/comments/[COMMENT_ID]?include=files` for comment info with a list of attached files

Example response:

```json
{
    "comments": [
        {
            "id": 125234,
            "thread_id": 79884,
            "user_id": 23129,
            "content": "See this description",
            "created_on": "2015-01-26T14:51:41Z",
            "updated_on": "2015-01-26T14:51:41Z"
        }
    ]
}
```

You can also [include related content](includes.md) when getting a comment.

<a name="create"></a>
## Creating a comment

To create a comment, make a POST request to:

* `/api/comments`

with the request body containing the new comment info. If you know the `thread_id` you can send it in the request body, or you can send the `discussion_id`, or `task_id`, or `file_id` if you are adding the comment to a discussion, or task, or file.

An example of adding a comment to a task:

```json
{
    "task_id": 12345,
    "content": "Please review my changes"
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new comment. The response body will contain the new comment info as in the **Getting a comment** section.

### Required fields

When creating a comment: `content` and one field from the group (`thread_id`, `task_id`, `discussion_id`, `file_id`).

<a name="update"></a>
## Updating a comment

To update an existing comment, make a POST or PUT request to:

* `/api/comments/[COMMENT_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the comment due date:

```json
{
    "content": "[Updated comment] Forget all I have said before" 
}
```

The response will return `200 OK` and will contain the updated comment info as in the **Getting a comment** section.

<a name="add-file"></a>
## Attaching a file to a comment

To add a file to a task, make a POST request to:

* `/api/comments/[COMMENT_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `file`. Here's an example using `curl` command line:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@screenshot.png"
  https://app.paymoapp.com/api/comments/12345
```

The file can also be added when creating the comment. In that case, all the comment fields should be send in `multipart-form-data` format together with the file.

<a name="delete"></a>
## Deleting a comment

To delete a comment, make a DELETE request to:

* `/api/comments/[COMMENT_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The comment object

A comment object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique comment identifier
content | html | Comment content
thread_id | integer | _(read-only)_ Id of the comments thread the comment is part of
user_id | integer | _(read-only)_ Id of the user that created the comment
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the comment was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the comment was last updated

## The thread object

A comment thread object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique thread identifier
project_id | integer | _(read-only)_ Id of the project the comments thread is part of
discussion_id | integer | _(read-only)_ Id of the discussion this thread of comments if linked to (Only one of the following attributes exists for a thread: `discussion_id` or `task_id` or `file_id`) 
task_id | integer | _(read-only)_ Id of the task this thread of comments if linked to 
file_id | integer | _(read-only)_ Id of the file this thread of comments if linked to 
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the comment was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the comment was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md) for a comment:

Object type|Include key|Relationship
-----------|-----------|----
[Thread](comments.md) | thread | parent
[User](users.md) | user | parent
[Project](projects.md) | project | parent
[Files](files.md) | files | child

The following object types can be used in [includes](includes.md) for a comments thread:

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[Discussion](discussion.md) | discussion | parent
[Task](tasks.md) | task | parent
[Files](files.md) | file | parent
[Comment](comments.md) | comment | child
