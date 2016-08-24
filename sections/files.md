# Files

* [Getting files](#list)
* [Getting a file](#get)
* [Uploading a file](#create)
* [Updating a file](#update)
* [Attaching an unattached file](#attach)
* [Deleting a file](#delete)
* [The file object](#object)
* [Dependent objects](#dependencies)

In Paymo files can be attached to projects. Besides this, inside a project, files can be attached to discussions, tasks or comments.

<a name="list"></a>
## Getting files

You can list files by making a GET request to:

* `/api/files?where=project_id=[PROJECT_ID]` for a list of all the files from a project
* `/api/files?where=discussion_id=[DISCUSSION_ID]` for a list of files attached to a discussion
* `/api/files?where=task_id=[TASK_ID]` for a list of files attached to a task
* `/api/files?where=comment_id=[COMMENT_ID]` for a list of files attached to a comment
 
Example of response:

```json
{
    "files": [
        {
            "id": 135371,
            "original_filename": "DSC00782.jpg",
            "user_id": 23129,
            "project_id": 397709,
            "comment_id": 125234,
            "size": "517429",
            "mime": "image/jpeg",
            "description": "",
            "created_on": "2015-01-26T14:52:15Z",
            "updated_on": "2015-01-26T14:52:17Z",
            "file": "https://app.paymoapp.com/assets/13980/projects/397709/41bba5de4f1ed25eb6ee626656df88fd.jpg",
            "image_thumb_large": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/large/41bba5de4f1ed25eb6ee626656df88fd.png",
            "image_thumb_medium": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/medium/41bba5de4f1ed25eb6ee626656df88fd.png",
            "image_thumb_small": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/small/41bba5de4f1ed25eb6ee626656df88fd.png",
            "tags": []
        },
        {
            "id": 135372,
            "original_filename": "Metamodel_Represented_in_UML_notation_v01.png",
            "user_id": 23129,
            "project_id": 397709,
            "task_id": 2322874,
            "size": "363491",
            "mime": "image/jpeg",
            "description": "",
            "created_on": "2015-01-26T15:05:52Z",
            "updated_on": "2015-01-26T15:05:54Z",
            "file": "https://app.paymoapp.com/assets/13980/projects/397709/d82674e90692d21cedcb31fbcb13f727.png",
            "image_thumb_large": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/large/d82674e90692d21cedcb31fbcb13f727.png",
            "image_thumb_medium": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/medium/d82674e90692d21cedcb31fbcb13f727.png",
            "image_thumb_small": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/small/d82674e90692d21cedcb31fbcb13f727.png",
            "tags": []
        }
    ]
}
```

You can also [include related content](includes.md) when listing files.

<a name="get"></a>
## Getting a file

To get the file info, make a GET request to:

* `/api/files/[FILE_ID]`

Example response:

```json
{
    "files": [
        {
            "id": 135371,
            "original_filename": "DSC00782.jpg",
            "user_id": 23129,
            "project_id": 397709,
            "comment_id": 125234,
            "size": "517429",
            "mime": "image/jpeg",
            "description": "",
            "created_on": "2015-01-26T14:52:15Z",
            "updated_on": "2015-01-26T14:52:17Z",
            "file": "https://app.paymoapp.com/assets/13980/projects/397709/41bba5de4f1ed25eb6ee626656df88fd.jpg",
            "image_thumb_large": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/large/41bba5de4f1ed25eb6ee626656df88fd.png",
            "image_thumb_medium": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/medium/41bba5de4f1ed25eb6ee626656df88fd.png",
            "image_thumb_small": "https://app.paymoapp.com/assets/13980/projects/397709/thumbs/small/41bba5de4f1ed25eb6ee626656df88fd.png",
            "tags": []
        }
    ]
}
```

You can also [include related content](includes.md) when getting a file.

<a name="create"></a>
## Uploading a file

To upload a file, make a POST request to:

* `/api/files`

The request content-type should be `multipart-form-data` and the file field name equal to `file`. To attach the file at the same time with the upload, send the `project_id` or `discussion_id` or `task_id` or `comment_id` data in the request. 

Here's an example using `curl` command line for uploading a file to a project:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@file.jpg"
  -F "project_id=123456"
  https://app.paymoapp.com/api/files
```

or an example of uploading a file and attaching it to a task:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@file.jpg"
  -F "task_id=90000"
  https://app.paymoapp.com/api/files
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new file. The response body will contain the new file info.
 
If you do not send a `project_id` or a `discussion_id` or a `task_id` or a `comment_id`, the file will not be attached to anything, but it will have a `token` attribute. 
Use this token to attach the file to a project, a discussion, a task or a comment.
The file will remain in a temporary location until it is attached.

If you have trouble getting your code to work for uploads, take a look at this [sample PHP script](sample_file_upload.php).

### Required fields

When uploading a file: `file`.

<a name="update"></a>
## Updating a file

To update an existing file, make a POST or PUT request to:

* `/api/files/[FILE_ID]`

with the request body containing the updated info. Only the following fields can be updated: `original_filename` (for renaming a file) and `description`.

Example of request body:

```json
{
    "description": "latest design changes"
}
```

The response will return `200 OK` and will contain the updated file info as in the **Getting a file** section.

<a name="attach"></a>
## Attaching an unattached file

For a file added with no `project_id` info you get a `token` attribute. To attach this file to a project (or discussion, or task, or comment), make a POST or PUT request to:

* `/api/files/[FILE_ID]`

with the `token` and `project_id` (or `discussion_id` or `task_id` or `comment_id`) in the request.

Example of request body if you want to attach the uploaded file to a comment:

```json
{
    "token": "060bee5d4f7aaf94ddd8629518260dc9",
    "comment_id": 123456
}
```

<a name="delete"></a>
## Deleting a file

To delete a file, make a DELETE request to:

* `/api/files/[FILE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The file object

A file object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique file identifier
original_filename | text | Original filename that was used when uploading. Note that it differs from the filenames in download links.
description | text | File description
user_id | integer | _(read-only)_ Id of the user who uploaded the file
project_id | integer | _(read-only)_ Id of the project the file is attached to
discussion_id | integer | _(read-only)_ Id of the discussion the file is attached to (Only one from the list exists: `discussion_id` or `task_id` or `comment_id`)
task_id | integer | _(read-only)_ Id of the task the file is attached to
comment_id | integer | _(read-only)_ Id of the comment the file is attached to
token | text | _(read-only)_ Token for temporary files. Use this token to attach the file.
size | integer | _(read-only)_ File size in bytes
file | text | _(read-only)_ Download link for the file
image_thumb_large | text | _(read-only)_ Large thumbnail URL for image files
image_thumb_medium | text | _(read-only)_ Medium thumbnail URL for image files
image_thumb_small | text | _(read-only)_ Small thumbnail URL for image files
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the file was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the file was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Project](projects.md) | project | parent
[User](users.md) | user | parent
[Discussion](discussions.md) | discussion | parent
[Task](tasks.md) | task | parent
[Comment](comments.md) | comment | parent

