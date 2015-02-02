# Reports

* [Getting reports](#list)
* [Getting a report](#get)
* [Creating a report](#create)
* [Updating a report](#update)
* [Deleting a report](#delete)
* [The report object](#object)
* [Dependent objects](#dependencies)

Reports in Paymo 3 are of several types:

* _static_ - This is the most common type. It represents data as it was at the moment of report creation.
* _live_ - Reports of this type are regenerated every time you view them. These are useful when you have to make periodic reports with the same parameters.
* _temp_ - Temporary reports are not stored, so you cannot see them inside the Paymo application. Use them when you only need the data from the report, without the report persisting in Paymo.

<a name="list"></a>
## Getting reports

You can list reports by making a GET request to:

* `/api/reports` for a list of all the reports
* `/api/reports?where=type=static` for a list of static reports
* `/api/reports?where=type=live` for a list of live reports
* `/api/reports?where=user_id=[USER_ID]` for a list of reports created by a user
 
Example of response:

```json
{
    "reports": [
        {
            "id": 115376,
            "name": "Time spent on \"Understanding Paymo\"",
            "user_id": 23129,
            "type": "live",
            "start_date": null,
            "end_date": null,
            "date_interval": "all_time",
            "projects": "all_active",
            "users": "all",
            "clients": [
                151303
            ],
            "include": {
                "projects": true,
                "tasklists": true,
                "tasks": true,
                "entries": true,
                "days": false,
                "clients": false,
                "users": false,
                "billed": false
            },
            "extra": {
                "display_entries_descriptions": true,
                "exclude_billed_entries": false,
                "exclude_nonbillable_tasks": false,
                "exclude_nonbillable_projects": false,
                "rounding_step": false,
                "enable_time_rounding": false,
                "display_charts": false,
                "display_costs": false,
                "display_projects_budgets": false,
                "display_tasks_descriptions": false,
                "display_projects_descriptions": false
            },
            "info": {
                "start_date": "2010-10-27T14:22:13Z",
                "end_date": "2015-01-13T10:29:18Z",
                "clients": [
                    {
                        "id": "151303",
                        "name": "Paymo"
                    }
                ],
                "projects": [
                    {
                        "id": "397706",
                        "name": "Understanding Paymo"
                    }
                ],
                "users": [
                    {
                        "id": "23130",
                        "name": "Judith Olivas Lucero"
                    }
                ]
            },
            "created_on": "2014-10-03T12:49:05Z",
            "updated_on": "2015-01-27T13:15:26Z",
            "download_token": "KMg9Z5S1JGjn1x/bsDl5NpBBw+ua/KRfzMlTL0SYMa0kvf0s4uM7bVzqS1D544H50horNGWwMnDCLRoKMwJw8A==",
            "permalink": "https://app.paymoapp.com/api/reports/115376/?token=OB9L%2BFrmnS6KCYVgE3bQmqF8t3GYCf2ckRFpXmDWw5ELu96pIPuOYFcCII%2Ffs%2B0nu5%2Bz6ra9ySgz%2BglcQFNKLyO8KaLJaNzZdar8lYvNktI%3D&format=html",
            "shared": false
        }
    ]
}
```

*Note* When listing the reports, the actual content of the reports is not included. 

You can also [include related content](includes.md) when listing reports.

<a name="get"></a>
## Getting a report

To get the report info, make a GET request to:

* `/api/reports/[REPORT_ID]`

Example response:

```json
{
    "reports": [
        {
            "id": 115376,
            "name": "Time spent on \"Understanding Paymo\"",
            "user_id": 23129,
            "type": "live",
            "start_date": null,
            "end_date": null,
            "date_interval": "all_time",
            "projects": "all_active",
            "users": "all",
            "clients": [
                151303
            ],
            "include": {
                "projects": true,
                "tasklists": true,
                "tasks": true,
                "entries": true,
                "days": false,
                "clients": false,
                "users": false,
                "billed": false
            },
            "extra": {
                "display_entries_descriptions": true,
                "exclude_billed_entries": false,
                "exclude_nonbillable_tasks": false,
                "exclude_nonbillable_projects": false,
                "rounding_step": false,
                "enable_time_rounding": false,
                "display_charts": false,
                "display_costs": false,
                "display_projects_budgets": false,
                "display_tasks_descriptions": false,
                "display_projects_descriptions": false
            },
            "info": {
                "start_date": "2010-10-27T14:22:13Z",
                "end_date": "2015-01-13T10:29:18Z",
                "clients": [
                    {
                        "id": "151303",
                        "name": "Paymo"
                    }
                ],
                "projects": [
                    {
                        "id": "397706",
                        "name": "Understanding Paymo"
                    }
                ],
                "users": [
                    {
                        "id": "23130",
                        "name": "Judith Olivas Lucero"
                    }
                ]
            },
            "created_on": "2014-10-03T12:49:05Z",
            "updated_on": "2015-01-27T13:15:26Z",
            "download_token": "KMg9Z5S1JGjn1x/bsDl5NpBBw+ua/KRfzMlTL0SYMa0kvf0s4uM7bVzqS1D544H50horNGWwMnDCLRoKMwJw8A==",
            "permalink": "https://app.paymoapp.com/api/reports/115376/?token=OB9L%2BFrmnS6KCYVgE3bQmqF8t3GYCf2ckRFpXmDWw5ELu96pIPuOYFcCII%2Ffs%2B0nu5%2Bz6ra9ySgz%2BglcQFNKLyO8KaLJaNzZdar8lYvNktI%3D&format=html",
            "shared": false,
            "content": {
                "items": [
                    {
                        "type": "project",
                        "time": 20409,
                        "pct": 100,
                        "id": 397706,
                        "title": "Understanding Paymo",
                        "color": "#68BE5E",
                        "level": 1
                    },
                    {
                        "type": "tasklist",
                        "time": 14709,
                        "pct": 72,
                        "id": 629810,
                        "title": "First Steps",
                        "project_id": 397706,
                        "level": 2
                    },
                    {
                        "type": "task",
                        "time": 14555,
                        "pct": 71,
                        "id": 2322841,
                        "title": "Change the task's position by dragging the handle on the left",
                        "project_id": 397706,
                        "level": 3
                    },
                    {
                        "type": "entry",
                        "time": 1495,
                        "pct": 7,
                        "id": 15628480,
                        "title": "",
                        "description": "",
                        "task_id": 2322841,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2014-12-17T13:10:53Z",
                        "end_time": "2014-12-17T13:35:48Z",
                        "level": 4
                    },
                    {
                        "type": "entry",
                        "time": 3600,
                        "pct": 18,
                        "id": 18432425,
                        "title": "",
                        "description": null,
                        "task_id": 2322841,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2015-01-13T08:00:00Z",
                        "end_time": "2015-01-13T09:00:00Z",
                        "level": 4
                    },
                    {
                        "type": "entry",
                        "time": 3600,
                        "pct": 18,
                        "id": 18432426,
                        "title": "",
                        "description": null,
                        "task_id": 2322841,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2015-01-13T08:00:00Z",
                        "end_time": "2015-01-13T09:00:00Z",
                        "level": 4
                    },
                    {
                        "type": "entry",
                        "time": 3660,
                        "pct": 18,
                        "id": 18432427,
                        "title": "",
                        "description": null,
                        "task_id": 2322841,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2015-01-13T08:00:00Z",
                        "end_time": "2015-01-13T09:01:00Z",
                        "level": 4
                    },
                    {
                        "type": "entry",
                        "time": 1200,
                        "pct": 6,
                        "id": 18432428,
                        "title": "",
                        "description": null,
                        "task_id": 2322841,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2015-01-13T08:00:00Z",
                        "end_time": "2015-01-13T08:20:00Z",
                        "level": 4
                    },
                    {
                        "type": "entry",
                        "time": 1000,
                        "pct": 5,
                        "id": 18432429,
                        "title": "",
                        "description": null,
                        "task_id": 2322841,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2015-01-13T10:12:38Z",
                        "end_time": "2015-01-13T10:29:18Z",
                        "level": 4
                    },
                    {
                        "type": "task",
                        "time": 94,
                        "pct": 0,
                        "id": 2322852,
                        "title": "Paymo interface in pictures",
                        "project_id": 397706,
                        "level": 3
                    },
                    {
                        "type": "entry",
                        "time": 94,
                        "pct": 0,
                        "id": 15117148,
                        "title": "",
                        "description": "",
                        "task_id": 2322852,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2014-12-11T09:45:00Z",
                        "end_time": "2014-12-11T09:46:34Z",
                        "level": 4
                    },
                    {
                        "type": "task",
                        "time": 60,
                        "pct": 0,
                        "id": 2322849,
                        "title": "Signup for Paymo",
                        "project_id": 397706,
                        "level": 3
                    },
                    {
                        "type": "entry",
                        "time": 60,
                        "pct": 0,
                        "id": 9917143,
                        "title": "",
                        "description": "Wow, it only took 10 seconds!",
                        "task_id": 2322849,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2014-10-03T15:00:00Z",
                        "end_time": "2014-10-03T15:01:00Z",
                        "level": 4
                    },
                    {
                        "type": "tasklist",
                        "time": 5700,
                        "pct": 28,
                        "id": 629811,
                        "title": "Time Tracking & Timesheets",
                        "project_id": 397706,
                        "level": 2
                    },
                    {
                        "type": "task",
                        "time": 5700,
                        "pct": 28,
                        "id": 3529606,
                        "title": "eee",
                        "project_id": 397706,
                        "level": 3
                    },
                    {
                        "type": "entry",
                        "time": 5700,
                        "pct": 28,
                        "id": 15117160,
                        "title": "",
                        "description": "",
                        "task_id": 3529606,
                        "project_id": 397706,
                        "is_bulk": false,
                        "user_id": 23129,
                        "start_time": "2014-12-11T08:00:00Z",
                        "end_time": "2014-12-11T09:35:00Z",
                        "level": 4
                    },
                    {
                        "type": "total",
                        "time": 20409,
                        "pct": 100,
                        "level": 0
                    }
                ]
            }
        }
    ]
}
```

You can also [include related content](includes.md) when getting a report.

<a name="create"></a>
## Creating a report

To create a report, make a POST request to:

* `/api/reports`

with the request body containing the new report info, as in the example below:

```json
{
   "name": "Report 01/27/2015 15:20",
   "type": "static",
   "date_interval": "this_month",
   "projects": "all_active",
   "users": [
      23130
   ],
   "clients": "all",
   "include": {
      "projects": true,
      "tasklists": true,
      "tasks": true
   },
   "extra": {
      "display_projects_budgets": true,
      "display_costs": true
   }
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new report. The response body will contain the new report info as in the **Getting a report** section.

### Report parameters

When creating a report: 

Field | Required | Description
---- | --------- | -----------
`name`| optional | Report name. Will appear in report header as well as in listings.
`type`| required | Report type. A value from the list: `static`, `live`, `temp`
`date_interval` | optional (to `start_date`, `end_date`) | If `date_interval` is sent, `start_date` and `end_date` are optional. See options below. 
`start_date` | optional (to `date_interval`) | If `date_interval` is not sent, `start_date` and `end_date` are required. Represents a date that starts the reporting date range.  
`end_date` | optional (to `date_interval`) | If `date_interval` is not sent, `start_date` and `end_date` are required. Represents a date that ends the reporting date range.
`projects` | optional | A list of project ids from which the time will be included into the report. Or a preset value of: `all` (for all projects, including archived), `all_active` (for active projects only).
`clients` | optional | A list of client ids from which the time will be included into the report. Or a preset value of: `all` (for all clients, including archived), `all_active` (for active clients only). If no `projects` is specified, this will define the projects to be included.
`users` | optional | A list of user ids for whom the time will be included into the report. Or a preset value of: `all` (for all users, including archived), `all_active` (for active users only).
`include` | optional | What info to include into the report. 
`extra` | optional | Additional options for the report. Options are: `exclude_billed_entries`

Options for `date_interval` param:

Option | Description
------|--------
`today`| date range equals to today (from midnight to midnight)
`yesterday`| date range starts yesterday at 00:00 and ends yesterday at 23:59.
`this_month` | starts on the 1st of this month (at 00:00) and ends on the last day of this month (at 23:59)
`this_month_strict` | starts on the 1st of this month (at 00:00) and ends today at 23:59
`last_month` | starts on the 1st of last month (at 00:00) and ends on the last day of last month (at 23:59)
`this_week` | starts on the 1st day of the week (as defined by user week start settings) at 00:00 and ends on the last day of the week (at 23:59)
`this_week_strict` | starts on the 1st day of the week (as defined by user week start settings) at 00:00 and ends today at 23:59
`last_week` | start on the 1st day of last week at 00:00 and ends on last day of last week at 23:59
`this_year` | starts on the 1st day of this year at 00:00 and ends on the last day of this year at 23:59
`last_year` | starts on the 1st day of last year at 00:00 and ends on the last day of last year at 23:59
`all_time` | will not restrict time entries based on date or time

All date interval time values are computed in the time zone of the user that views the report.

Options for `include` param:

Option|Description
----- | ---------
`days` | group time by days
`clients` | group by clients
`users` | group by users
`projects` | group by projects
`tasklists` | group by task lists
`tasks` | group by tasks
`billed` | separate time into billed and unbilled
`entries` | include time entries info (start/end time)

Options for `extra` param:

Option|Description
------|-----------
`exclude_billed_entries`| excludes from report entries that were billed (an invoice for those entries was created)
`exclude_nonbillable_tasks`|excludes from report time from tasks that are not billable
`exclude_nonbillable_projects`|excludes from report time from projects that are not billable
`enable_time_rounding`|enables rounding up time to increments of `rounding_step` value (see below)
`rounding_step` | minimal time entry length increment (in minutes). Example: if `rounding_step` = 15, and a time entry included into the report has a length of 8 minutes, in the report it will appear as 15 minutes. If the time entry length was 32 minutes, it will appear as 45 minutes.
`display_charts` | if set, the Paymo application will also display a pie chart representing all report time distribution
`display_costs` | if set, the report will also contain computed costs for each included report element
`display_project_budgets` | if set, the projects items from the report will contain project budget info
`display_tasks_descriptions` | if set, tasks from the report will also contain their descriptions
`display_tasks_complete_status` | if set, tasks from the report will also contain their completed status
`display_entries_descriptions` | if set, entries from the report will also contain their descriptions
`display_projects_descriptions` | if set, projects from the report will also contain their descriptions
`display_seconds` | if set, the report will display time entries to the seconds (in Paymo application)

### Report format

A report will contain an `info` property that will represent real values for `start_date`, `end_date`, `clients`, `projects`, `users` parameters.

For example: 

If `date_interval` = `this_month` was sent as parameter for the report, `info` will contain `start_date` and `end_date` as real dates that represent this month.
If `projects` = `all_active`, the `info.projects` will contain a list of all active projects that were used to create the report.

All report content is contained in the `content` property.

<a name="update"></a>
## Updating a report

To update an existing report, make a POST or PUT request to:

* `/api/reports/[REPORT_ID]`

with the request body containing the new report info. The same parameters as for creating a report are required for updating it.

The response will return `200 OK` and will contain the updated report info as in the **Getting a report** section.

<a name="delete"></a>
## Deleting a report

To delete a report, make a DELETE request to:

* `/api/reports/[REPORT_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The report object

A report object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique report identifier
name | text | Report name
user_id | integer | User id that created the report
type | text | Report type (`static`, `live`, `temp`)
start_date | text | Start date param (condition used to create the report)
end_date | text | End date param (condition used to create the report)
date_interval | text | Date interval condition used to create the report (see [creating a report](#create))
projects | text | Projects condition used to create the report (see [creating a report](#create))
clients | text | Clients condition used to create the report (see [creating a report](#create))
users | text | Users condition used to create the report (see [creating a report](#create))
include | object | Include options used to create the report (see [creating a report](#create)) 
extra | object | Extra options used to create the report (see [creating a report](#create))
info | object | Expanded values for the create parameters
content | object | The actual report content (contains a list of items)
permalink | url | Report permalink
shared | boolean | If set, the report is shared with a client
share_client_id | integer | The id of the client this report was shared with. It is possible to share a report with a client only if the time included into the report was from this single client.
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the report was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the report was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[User](users.md) | user | parent
[Client](clients.md) | client | parent
