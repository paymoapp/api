# Users

* [Getting users](#list)
* [Getting a user](#get)
* [Creating a user](#create)
* [Updating a user](#update)
* [Archiving or activating a user](#archive)
* [Adding a profile photo](#add-image)
* [Deleting a user](#delete)
* [The user object](#object)
* [Dependent objects](#dependencies)

Paymo users are assigned to a company. The types of users are:
  
  * _Admins_, have rights to everything in a company.
  * _Employees_, have rights only to the projects they are assigned to.
  * _Project Managers_, like and employee, except they have full rights to the projects they manage.
   
To access Paymo, a user must be activated. The opposite of being activated is being retired (or archived) from Paymo.
Retired users cannot log into Paymo. 
   
The maximal number of active users in a company is set up in the Paymo subscription.
  
<a name="list"></a>  
## Getting users

You can list users by making a GET request to:

* `/api/users` for a list of all users in the company.
* `/api/users?where=active=true` for a list of active users only.
* `/api/users?where=active=false` for a list of retired users.
* `/api/users?where=type=Admin` for a list of admin users.
* `/api/users?where=type=Employee` for a list of employees.

Example response for listing requests:

```json
{
   "users": [
      {
         "id": 1,
         "name": "Michael Scott",
         "email": "michael@dundermifflin.com",
         "type": "Admin",
         "active": true,
         "phone": "860-437-7283",
         "skype": null,
         "position": "CEO",
         "workday_hours": 10,
         "price_per_hour": 80,
         "image": "https://app.paymoapp.com/assets/1/users/michael.jpg",
         "created_on": "2013-08-01T13:09:16Z",
         "updated_on": "2015-01-06T19:53:51Z",
         "timezone": "US/Eastern",
         "date_format": "m/d/Y",
         "decimal_sep": ".",
         "language": "en",
         "thousands_sep": "",
         "time_format": "H:i",
         "week_start": "1",
         "assigned_projects": [
            28917,
         ],
         "managed_projects": [
            28917
         ]
      },   
      {
         "id": 2,
         "name": "Dwight Schrute",
         "email": "dwight@dundermifflin.com",
         "type": "Employee",
         "active": true,
         "timezone": "US/Central",
         "phone": "860-437-1329",
         "skype": null,
         "position": "Marketing",
         "workday_hours": 8,
         "price_per_hour": 45,
         "image": "https://app.paymoapp.com/assets/1/users/dwight.jpg",
         "created_on": "2013-06-26T12:07:44Z",
         "updated_on": "2014-10-15T12:56:43Z",
         "date_format": "m/d/Y",
         "decimal_sep": ".",
         "language": "en",
         "time_format": "H:i",
         "week_start": "1",
         "assigned_projects": [
            28918,
            28936
         ],
         "managed_projects": [
            28936
         ]
      }      
   ]
}
```

You can also [include related content](includes.md) when getting the list of users.

<a name="get"></a>
## Getting a user 

To get the user's info, make a GET request to:

* `/api/users/[USER_ID]`

Example of response:

```json
{
   "users": [
      {
         "id": 1,
         "name": "Michael Scott",
         "email": "michael@dundermifflin.com",
         "type": "Admin",
         "active": true,
         "phone": "860-437-7283",
         "skype": null,
         "position": "CEO",
         "workday_hours": 10,
         "price_per_hour": 80,
         "image": "https://app.paymoapp.com/assets/1/users/michael.jpg",
         "created_on": "2013-08-01T13:09:16Z",
         "updated_on": "2015-01-06T19:53:51Z",
         "timezone": "US/Eastern",
         "date_format": "m/d/Y",
         "decimal_sep": ".",
         "language": "en",
         "thousands_sep": "",
         "time_format": "H:i",
         "week_start": "1",
         "assigned_projects": [
            28917,
         ],
         "managed_projects": [
            28917
         ]
      }
   ]
}
```

You can also [include related content](includes.md) when getting a user.

<a name="create"></a>
## Creating a user

To create a user, make a POST request to:

* `/api/users`

with the request body containing the new user info, as in the example below:

```json
{
    "email": "kelly@dundermifflin.com",
    "type": "Employee",
    "assigned_projects": [28917],
    "password": "secret"
}
```

If successful, the response will return `201 Created`. The response body will contain the new user info as in the **Getting a user** section.

If your company does not have a paid Paymo subscription or you have reached the active users limit set up by the subscription, you will get a `403 Error: Could not add user. Maximum number of users reached.`

If the `password` attribute is sent, the user will have the desired password. If not, the user will not have a password set. 
If the user is added from the Paymo application, a Welcome to Paymo email will be sent which contains a link that will take the user through the setup process, where a name and a password will be set.

### Required fields 

When creating a user: `email`.

<a name="update"></a>
## Updating a user

To update an existing user, make a POST or PUT request to:

* `/api/users/[USER_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the list of assigned projects of a user:

```json
{
    "assigned_projects": [28917, 28918]
}
```

<a name="change-password"></a>
## Changing user password

To change a user's password, make an update request with new password, as in:

```json
{
    "password": "new password"
}
```

<a name="archive"></a>
## Archiving (retiring) or activating a user

To archive a user, make an update request with the following request body:

```json
{
    "active": false
}
```

To activate, send a `true` value.

<a name="add-image"></a>
## Adding a profile photo 

To add a user profile photo, make a POST request to:

* `/api/users/[USER_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `image`. Here's an example using `curl` command line:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "image=@file.jpg"
  https://app.paymoapp.com/api/users/12345
```

Accepted image file formats are: JPEG, PNG, GIF.

The profile image of an user can be added when creating the user. In that case, all the user fields should be send in `multipart-form-data` format together with the file.

<a name="delete"></a>
## Deleting a user

To delete a user, make a DELETE request to:

* `/api/users/[USER_ID]`

### Warning

**Deleting a user will also delete all time logged by that user!**

<a name="object"></a>
## The user object

A user object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique user identifier
name | text | Full name
email | email | Email address. There are no two active users in Paymo with the same email address. Email is used to receive notifications from Paymo as well as to log into Paymo.
type | text | Account type. Available options: `Admin`, `Employee`.
active | boolean | If `true` the user is active and can use Paymo, otherwise it is retired (archived).
timezone | text | User timezone. [List of available options](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
phone | text | Phone number
skype | text | Skype account name
position | text | Job position description
workday_hours | decimal | Number of working hours in a day. It is used to compute user performance.
price_per_hour | decimal | Price per hour. It is used in invoicing to compute the cost of worked time.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the user was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the user was last updated
image | url | User profile image URL
image_thumb_large | url | _(read-only)_ User profile image large size thumbnail URL
image_thumb_medium | url | _(read-only)_ User profile image medium size thumbnail URL
image_thumb_small | url | _(read-only)_ User profile image small size thumbnail URL
date_format | text | Format for displaying dates in the application. Available options: `Y-m-d`, `d/m/Y`, `m/d/Y`, `d.m.Y`.
time_format | text | Format for displaying time values. Available options: `H:i` for 24-hour format, `h:i a` for 12-hour format. 
decimal_sep | text | Decimal separator for displaying numeric values
thousands_sep | text | Thousands separator for displaying numeric values
week_start | text | Numeric value in the range 0-6 representing the day the week starts, 0 being Sunday, 6 being Saturday.
language | text | Paymo user interface language
theme | text | Paymo user interface theme name
assigned_projects | list | List of projects ids to which the user is assigned 
managed_projects | list | List of projects ids that the user manages. This list is a subset of `assigned_projects`.
is_online | boolean | _(read-only)_ If `true` the user is logged into Paymo.
password | text | _(only for create/update requests)_ User password when creating or updating a user.

<a name="dependencies"></a>
## Dependent objects

The following object types ca be used in [includes](includes.md):

Object type|Include key
-----------|-----------
[Comment](comments.md) | comments
[Discussion](discussions.md) | discussions
[Time Entry](entries.md) | entries
[Expense](expenses.md) | expenses
[File](files.md) | files
[Milestone](milestones.md) | milestones
[Report](reports.md) | reports
