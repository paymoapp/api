# Expenses

* [Getting expenses](#list)
* [Getting an expense](#get)
* [Creating an expense](#create)
* [Updating an expense](#update)
* [Invoicing an expense](#invoicing)
* [Attaching a receipt to an expense](#attach-receipt)
* [Deleting an expense](#delete)
* [The expense object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting expenses

You can list expenses by making a GET request to:

* `/api/expenses` for a list of all the expenses
* `/api/expenses?where=client_id=[CLIENT_ID]` for a list of all the expenses from a client
* `/api/expenses?where=project_id=[PROJECT_ID]` for a list of all the expenses from a project
* `/api/expenses?where=date>=2014-09-01` for a list of expenses added after Sep 1st, 2014
* `/api/expenses?where=invoiced=false` for a list of all expenses not yet invoiced
 
Example of response:

```json
{
   "expenses":[
      {
         "id":1259,
         "client_id":1259,
         "project_id":null,
         "user_id":3180,
         "amount":223.26,
         "currency":"USD",
         "date":"2013-03-28",
         "notes":"Travel to Boston",
         "invoiced":false,
         "invoice_item_id":null,
         "file":"",
         "created_on":"2013-03-28T15:06:28Z",
         "updated_on":"2013-03-28T15:06:28Z",
         "tags":[
            "Mileage"
         ]
      },
      {
         "id":1261,
         "client_id":1261,
         "project_id":null,
         "user_id":3180,
         "amount":9.45,
         "currency":"USD",
         "date":"2013-01-04",
         "notes":"Meeting with client",
         "invoiced":true,
         "invoice_item_id":7810,
         "file":"",
         "created_on":"2015-03-05T20:09:17Z",
         "updated_on":"2015-03-05T20:52:42Z",
         "tags":[
            "Restaurant"
         ]
      }
   ]
}
```

You can also [include related content](includes.md) when listing expenses.

<a name="get"></a>
## Getting an expense

To get the expense info, make a GET request to:

* `/api/expenses/[EXPENSE_ID]`

Example response:

```json
{
   "expenses":[
      {
         "id":1259,
         "client_id":1259,
         "project_id":null,
         "user_id":3180,
         "amount":223.26,
         "currency":"USD",
         "date":"2013-03-28",
         "notes":"Travel to Boston",
         "invoiced":false,
         "invoice_item_id":null,
         "file":"",
         "created_on":"2013-03-28T15:06:28Z",
         "updated_on":"2013-03-28T15:06:28Z",
         "tags":[
            "Mileage"
         ]
      }
   ]
}  
```

You can also [include related content](includes.md) when getting an expense.

<a name="create"></a>
## Creating an expense

To create an expense, make a POST request to:

* `/api/expenses`

with the request body containing the new expense info, as in the example below:

```json
{
	"client_id": 1261,
	"user_id": 318,
	"amount": 29.95,
	"currency": "USD",
	"date": "2013-02-14",
	"notes": "Hosting",
	"tags": [
		"Software/Service"
	]
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new expense. The response body will contain the new expense info as in the **Getting an expense** section.

### Required fields

When creating an expense: `client_id`, `currency`, `amount`.

<a name="update"></a>
## Updating an expense

To update an existing expense, make a POST or PUT request to:

* `/api/expenses/[EXPENSE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the expense date:

```json
{
    "date": "2015-02-15"
}
```

The response will return `200 OK` and will contain the updated expense info as in the **Getting an expense** section.

<a name="invoicing"></a>
## Invoicing an expense

To invoice an expense, you have to create an invoice with the expense as an invoice line item. For example:

```json
{
   "client_id":1261,
   "currency":"USD",
   "date":"2013-08-14",
   "items":[
      {
         "item":"Expense",
         "expense_id":100545
      }
   ]
}
```
If successful, the expense will be updated with `invoiced`=`true` and `invoice_item_id` will contain the ID of the invoice line item for the expense. 

Alternatively, to mark an expense as invoiced without creating an invoice, make an update request with the following body:

```json
{
    "invoiced": true
}
```

<a name="attach-receipt"></a>
## Attaching a receipt to an expense

To add a receipt to an existing expense, make a POST request to:

* `/api/expenses/[EXPENSE_ID]`

The request content-type should be `multipart-form-data` and the file field name equal to `file`. Here's an example using `curl` command line:

```shell
curl -u email:password
  -H 'Accept: application/json'
  -F "file=@receipt.jpg"
  https://app.paymoapp.com/api/expenses/1261
```

The receipt for an expense can also be added when creating the expense. In that case, all the expense fields should be send in `multipart-form-data` format together with the file.

If the receipt file is an image, the expense object representation will contain additional fields for thumbnails.

<a name="delete"></a>
## Deleting an expense

To delete an expense, make a DELETE request to:

* `/api/expenses/[EXPENSE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The expense object

An expense object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique expense identifier
notes | text | Expense notes or description
client_id | integer | Client id 
project_id | integer | Project id 
user_id | integer | Id of the user who added the expense. 
date | [date](datetime.md) | Date for the expense
invoiced | boolean | If `true` the expense is marked as invoiced.
invoice_item_id | integer | Id of the invoice line item when the expense was invoiced.
tags | list | List of tags for the expense.
file | url | Receipt file URL
file_thumb_large | url | _(read-only)_ Receipt large size thumbnail URL. _(Only for images)_
file_thumb_medium | url | _(read-only)_ Receipt medium size thumbnail URL. _(Only for images)_
file_thumb_small | url | _(read-only)_ Receipt small size thumbnail URL. _(Only for images)_
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the expense was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the expense was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Client](clients.md) | client | parent
[Project](projects.md) | project | parent
[User](users.md) | user | parent
[Invoice Item](invoices.md#item-object) | invoiceitems | child
