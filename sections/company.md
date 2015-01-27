# Company

* [Getting company info](#get)
* [Updating company](#update)
* [Adding a company logo](#add-image)
* [The company object](#object)

<a name="get"></a>
## Getting company info

You can get the company info along with the settings for the company by making a GET request to:

* `/api/company`

Example response:

```json
{
   "company": {
      "id": 123,
      "name": "Dunder Mifflin Paper Company",
      "address": "Academy St, Scranton, PA 18504",
      "phone": "+015641789891",
      "email": "michael@dundermifflin.com",
      "url": "www.dundermifflin.com",
      "fiscal_information": "",
      "country": "US",
      "image": "https:\/\/app.paymoapp.com\/assets\/123\/ec4e71d560281f6d55b8c24c7f42db2f.png",
      "active": true,
      "account_type": "commercial",
      "created_on": "2014-10-03T12:49:05Z",
      "updated_on": "2014-12-03T12:55:49Z",
      "apply_tax_to_expenses": "1",
      "date_format": "m/d/Y",
      "default_currency": "USD",
      "default_price_per_hour": "30",
      "default_tax": "0",
      "default_tax2": "0",
      "default_tax2_text": "Tax2",
      "default_tax_text": "V.A.T.",
      "due_interval": "30",
      "estimate_format": "#EST-[yyyy][mm][dd]-[i]",
      "hide_tax_field": "",
      "invoice_format": "#INV-[yyyy][mm][dd]-[i]",
      "language": "en",
      "next_estimate_number": "101",
      "next_invoice_number": "201",
      "payment_reminder_1": "0",
      "payment_reminder_2": "0",
      "payment_reminder_3": "0",
      "remove_paymo_branding": "",
      "tax_on_tax": "0",
      "timezone": "US/Eastern",
      "time_format": "h:i a",
      "week_start": "1",
      "workday_start": "09:00",
      "workday_end": "17:00",
      "working_days": "1,2,3,4,5",
      "decimal_sep": ".",
      "thousands_sep": ",",
      "online_payments": true,
      "max_users": 4,
      "current_users": 2,
      "max_projects": null,
      "current_projects": 6,
      "max_invoices": null,
      "current_invoices": 0
   }
}
```

<a name="update"></a>
## Updating company 

To update the company info or add/modify a company setting, make a POST or PUT request to:

* `/api/company`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the company name:

```json
{
  "name": "Our new company name"
}
```

**Note**: Not all the attributes of a company can be changed.

<a name="add-image"></a>
## Adding a company logo 

To add a company logo image, make a POST request to:

* `/api/company`

The request content-type should be `multipart-form-data` and the file field name equal to `image`. Here's an example using `curl` command line:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "image=@logo.png"
  https://app.paymoapp.com/api/company
```

Accepted image file formats are: JPEG, PNG, GIF.

<a name="object"></a>
## The company object

Attribute|Type|Description
------|------|-----
id | integer | _(read-only)_ Unique company identifier
name | text | Company name
address | text | Company address
phone | text | Company phone number
email | email | Company email address. This is the main email address where notifications from Paymo are send. It is also the email address that was used at sign-up and is the email address of the first user.
url | url | Company website 
fiscal_information | text | Fiscal information (used in invoice headers)
country | text | Company country code in [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format
image | url | Company logo image URL
image_thumb_large | url | _(read-only)_ Company logo large size thumbnail URL
image_thumb_medium | url | _(read-only)_ Company logo medium size thumbnail URL
image_thumb_small | url | _(read-only)_ Company logo small size thumbnail URL
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the project was last updated
timezone | text | Default company timezone. This timezone value will be used by default when viewing invoices, reports, estimates in permalinks. [List of available options](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
default_currency | text | Default currency for the company. [List of available currencies](currencies.md)
default_price_per_hour | text | Default price per hour. It is used as the default value for user price per hour, when adding new users. 
apply_tax_to_expenses | text | If equal to `1` will apply tax to expenses when creating new invoices.
tax_on_tax | text | Default value for invoice `tax_on_tax` when creating new invoices. 
currency_position | text | Position of currency relative to displayed amounts. Available options: `left`, `right`.
next_invoice_number | text | Autoincrement number value when creating new invoice
next_estimate_number | text | Autoincrement number value when creating new estimate
online_payments | text | If equal to `1`, online payment for invoices will be enabled.
date_format | text | Format for displaying dates in the application. Available options: `Y-m-d`, `d/m/Y`, `m/d/Y`, `d.m.Y`.
time_format | text | Format for displaying time values. Available options: `H:i` for 24-hour format, `h:i a` for 12-hour format. 
decimal_sep | text | Decimal separator for displaying numeric values
thousands_sep | text | Thousands separator for displaying numeric values
week_start | text | Numeric value in the range 0-6 representing the day the week starts, 0 being Sunday, 6 being Saturday.
workday_start | text | Workday start hour in HH:SS 24-hour format
workday_end | text | Workday end hour in HH:SS 24-hour format
working_days | text | Comma separated list of working days of the week. Days are represented by numbers in the range 0-6, 0 being Sunday, 6 being Saturday.
account_type | text | _(read-only)_ Type of Paymo account: free or commercial
max_users | integer | _(read-only)_ Maximal number of active users for the company, as set up in the Paymo subscription
current_users | integer | _(read-only)_ Number of active users in the company
max_projects | integer | _(read-only)_ Maximal number of active projects for the company. If `null`, the limit does not apply.
current_projects | integer | _(read-only)_ Number of active projects in the company
max_invoices | integer | _(read-only)_ Maximal number of invoices that can be created this month, as set up in the Paymo subscription. If `null`, the limit does not apply.
current_invoices | integer | _(read-only)_ Number of invoices created this month



