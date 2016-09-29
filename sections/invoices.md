# Invoices

* [Getting invoices](#list)
* [Getting an invoice](#get)
* [Creating an invoice](#create)
* [Updating an invoice](#update)
* [Deleting an invoice](#delete)
* [The invoice object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting invoices

You can list invoices by making a GET request to:

* `/api/invoices` for a list of all the invoices
* `/api/invoices?where=client_id=[CLIENT_ID]` for a list of invoices for a specific client
* `/api/invoices?where=status=paid` for a list of paid invoices
* `/api/invoices?where=status in ("draft","void")` for a list of all draft and void invoices
* `/api/invoices?where=total>100` for a list of all invoices with a total greater than 100

The list above is not exhausted. You can combine multiple conditions as in:

* `/api/invoices?where=client_id=[CLIENT_ID] and status=draft` for a list of draft invoices for a specific client

Example of response:

```json
{
   "invoices":[
      {
         "id":14423,
         "client_id":10875,
         "template_id":null,
         "number":"#INV-20120119-2",
         "status":"draft",
         "currency":"USD",
         "date":"2012-01-19",
         "due_date":"2012-02-19",
         "subtotal":1593,
         "total":1911.6,
         "tax":20,
         "tax2":0,
         "tax_amount":318.6,
         "tax2_amount":0,
         "tax_on_tax":true,
         "language":"en",
         "bill_to":"Best Buy Co., Inc.\r\nBrian J. Dunn\r\n\r\nRichfield, Minnesota\r\nUSA",
         "company_info":"Dunder Mifflin\r\nAcademy St\r\nScranton, PA 18504\r\nmichael@dundermifflin.com\r\n+015641789891",
         "footer":"Thank you for your business. Created using the Paymo.biz time tracking and invoicing application",
         "notes":"",
         "outstanding":0,
         "tax_text":"V.A.T.",
         "tax2_text":"Tax2",
         "title":"INVOICE",
         "pay_online":false,
         "reminder_1_sent":null,
         "reminder_2_sent":null,
         "reminder_3_sent":null,
         "created_on":"2013-06-26T12:07:44Z",
         "updated_on":"2015-04-30T10:06:43Z",
         "download_token":"Ghz61QJSem+pJCCH59o+Gie7kYb6Cxx+pVsmATYpoJSDeKDvvi8Gn4LEUIkTBCN2jotfDTo4PyQwpjLu5zigGg==",
         "permalink":"https://app.paymoapp.com/api/invoices/14423/?token=v6k0kR4pNpyQT%2FboFYDfy62IRoL0Al%2BhwrMHq7wEwBPkylBCkaBv8XU%2Bm8wFNLwp7KZRo1a3edqg2870JNrCSQoAIrh7eNVZIkDa%2BVcV7AY%3D&format=html",
         "pdf_link":"https://app.paymoapp.com/api/invoices/14423/?token=v6k0kR4pNpyQT%2FboFYDfy62IRoL0Al%2BhwrMHq7wEwBPkylBCkaBv8XU%2Bm8wFNLwp7KZRo1a3edqg2870JNrCSQoAIrh7eNVZIkDa%2BVcV7AY%3D&format=pdf",
         "token":"v6k0kR4pNpyQT/boFYDfy62IRoL0Al+hwrMHq7wEwBPkylBCkaBv8XU+m8wFNLwp7KZRo1a3edqg2870JNrCSQoAIrh7eNVZIkDa+VcV7AY="
      },
      {
         "id":110723,
         "client_id":10872,
         "template_id":null,
         "number":"#INV-20140312-162",
         "status":"draft",
         "currency":"USD",
         "date":"2014-03-12",
         "due_date":"2014-04-11",
         "subtotal":375,
         "total":386.25,
         "tax":3,
         "tax2":0,
         "tax_amount":11.25,
         "tax2_amount":0,
         "tax_on_tax":true,
         "language":"",
         "bill_to":"Cisco Systems, Inc.\n170 West Tasman Dr\nSan Jose, California 95134\nUS",
         "company_info":"Dunder Mifflin\nAcademy St\nScranton, PA 18504\nmichael@dundermifflin.com\n+015641789891\nTest Fiscal information",
         "footer":"invoice footer",
         "notes":"",
         "outstanding":null,
         "tax_text":"V.A.T.",
         "tax2_text":"Tax2",
         "title":"INVOICE",
         "pay_online":false,
         "reminder_1_sent":null,
         "reminder_2_sent":null,
         "reminder_3_sent":null,
         "created_on":"2014-03-12T10:10:02Z",
         "updated_on":"2014-07-23T14:22:05Z",
         "download_token":"WuAQPeqS1WRpzHtROUbZk4k2JJ47sBF5R6YuFT4vP04UW8+cOcZn0yNETRmqhr0dJZAkGBPQIzqQD41T42HUPQ==",
         "permalink":"https://app.paymoapp.com/api/invoices/110723/?token=i%2Bz6uJ%2BahzZKdfM0pu8e%2BF3OSt1xKShAWdtliiXHlKL6eEbWCOACHQutqPz1IUI%2BdMqSYuvJ9omKUz%2BgqmXhdLvkovr%2BSyE%2BoR3plvIuuVE%3D&format=html",
         "pdf_link":"https://app.paymoapp.com/api/invoices/110723/?token=i%2Bz6uJ%2BahzZKdfM0pu8e%2BF3OSt1xKShAWdtliiXHlKL6eEbWCOACHQutqPz1IUI%2BdMqSYuvJ9omKUz%2BgqmXhdLvkovr%2BSyE%2BoR3plvIuuVE%3D&format=pdf",
         "token":"i+z6uJ+ahzZKdfM0pu8e+F3OSt1xKShAWdtliiXHlKL6eEbWCOACHQutqPz1IUI+dMqSYuvJ9omKUz+gqmXhdLvkovr+SyE+oR3plvIuuVE="
      }
  ]
}
```

You can also [include related content](includes.md) when listing invoices.

<a name="get"></a>
## Getting an invoice

To get the invoice info, make a GET request to:

* `/api/invoices/[INVOICE_ID]` will return just the invoice subtotals/totals/tax amounts, not the invoice items
* `/api/invoices/[INVOICE_ID]?include=invoiceitems` will include invoice items (lines) information

Example response:

```json
{
   "invoices":[
      {
         "id":110723,
         "client_id":10872,
         "template_id":null,
         "number":"#INV-20140312-162",
         "status":"draft",
         "currency":"USD",
         "date":"2014-03-12",
         "due_date":"2014-04-11",
         "subtotal":375,
         "total":386.25,
         "tax":3,
         "tax2":0,
         "tax_amount":11.25,
         "tax2_amount":0,
         "tax_on_tax":true,
         "language":"",
         "bill_to":"Cisco Systems, Inc.\n170 West Tasman Dr\nSan Jose, California 95134\nUS",
         "company_info":"Dunder Mifflin\nAcademy St\nScranton, PA 18504\nmichael@dundermifflin.com\n+015641789891\nTest Fiscal information",
         "footer":"invoice footer",
         "notes":"",
         "outstanding":null,
         "tax_text":"V.A.T.",
         "tax2_text":"Tax2",
         "title":"INVOICE",
         "pay_online":false,
         "reminder_1_sent":null,
         "reminder_2_sent":null,
         "reminder_3_sent":null,
         "download_token":"MUakYT1hv12mgT/Me8TsMiw9gGl+nB+5pUuK1UbY36ykR2Di/4dBmuNYormwYZ7BbLLqJ+5+emQHh2cBW2Xc7g==",
         "permalink":"https://app.paymoapp.com/api/invoices/110723/?token=i%2Bz6uJ%2BahzZKdfM0pu8e%2BF3OSt1xKShAWdtliiXHlKL6eEbWCOACHQutqPz1IUI%2BdMqSYuvJ9omKUz%2BgqmXhdLvkovr%2BSyE%2BoR3plvIuuVE%3D&format=html",
         "pdf_link":"https://app.paymoapp.com/api/invoices/110723/?token=i%2Bz6uJ%2BahzZKdfM0pu8e%2BF3OSt1xKShAWdtliiXHlKL6eEbWCOACHQutqPz1IUI%2BdMqSYuvJ9omKUz%2BgqmXhdLvkovr%2BSyE%2BoR3plvIuuVE%3D&format=pdf",
         "token":"i+z6uJ+ahzZKdfM0pu8e+F3OSt1xKShAWdtliiXHlKL6eEbWCOACHQutqPz1IUI+dMqSYuvJ9omKUz+gqmXhdLvkovr+SyE+oR3plvIuuVE=",
         "created_on":"2014-03-12T10:10:02Z",
         "updated_on":"2014-07-23T14:22:05Z",
         "invoiceitems":[
            {
               "id":240130,
               "invoice_id":110723,
               "item":"Monthly campaign",
               "description":"placing banners/adds",
               "price_unit":15,
               "quantity":25,
               "expense_id":null,
               "apply_tax":true,
               "seq":1,
               "created_on":"2014-03-12T10:10:02Z",
               "updated_on":"2014-07-23T14:22:05Z"
            }
         ]
      }
   ]
}
```

You can also [include related content](includes.md) when getting an invoice.

<a name="create"></a>
## Creating an invoice

To create an invoice, make a POST request to:

* `/api/invoices`

with the request body containing the new invoice info including the invoice items (lines), as in the example below:

```json
{
   "date":"2015-02-24",
   "due_date":"2015-03-24",
   "client_id":10869,
   "currency":"USD",
   "number":"INV-488",
   "company_info":"Company Info\nMore info",
   "bill_to":"Billing Info\nMore info",
   "tax":20,
   "items":[
	  {
		 "item":"Item 1",
		 "description":"Description & specs for item 1",
		 "price_unit":5.5,
		 "quantity":2,
	  },
	  {
		 "item":"Item 2",
		 "description":"Description\nFor Item 2",
		 "price_unit":159,
		 "quantity":1,
	  }
   ]
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new invoice. The response body will contain the new invoice info as in the **Getting an invoice** section.

### Required fields

When creating an invoice: `client_id`, `currency`.
For a complete description of all invoice fields, see [invoice object](#object).

### Invoice items

Invoice items are defined in `items` property of the request object. It is an array of objects, each one having the following keys:

* `item` represents the name of the invoice item
* `description` (optional) more details about the item
* `price_unit` (decimal) price per unit (the currency is the same as that of the invoice)
* `quantity` (decimal) item quantity
* `expense_id` (optional) identifies the expense that is invoiced
* `apply_tax` (boolean) (optional) whether or not to apply tax to this item (usually tax does not apply for expenses)
* `seq` (int) (optional) specifies the position of this invoice item among the items list
* `entries` (array of entries ids) (optional) a list of entries that will be marked as billed (it is used when billing time from timesheets)

### Invoice number

When creating an invoice, if you don't provide an invoice number, Paymo will automatically create one using the number format and next invoice number from Company Settings (`invoice_format` and `next_invoice_number` attributes of the company object).

If you provide your custom number, this number will be checked against existing invoice number. In case there is already an invoice with the provided number, the creation of the new invoice will fail.
After each new invoice is created (either the invoice number is automatically assigned or custom defined) the value of `next_invoice_number` will be incremented.

<a name="create-from-estimate"></a>
### Creating an invoice from an estimate

When creating an invoice from an estimate, you should submit an additional field `estimate_id`. This will update the estimate status to `invoiced`.
Note that you have to provide all the usual invoice information including invoice items.

<a name="update"></a>
## Updating an invoice

To update an existing invoice, make a POST or PUT request to:

* `/api/invoices/[INVOICE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the invoice footer and 'bill to' info:

```json
{
    "footer": "Thank you for your business",
    "bill_to": "Acme, Inc.\nSan Jose, CA"
}
```

The response will return `200 OK` and will contain the updated invoice info as in the **Getting an invoice** section.

## Changing invoice status

An invoice can be in one of the following states: `draft`, `sent`, `viewed`, `paid` and `void`.
Invoice status will change automatically in some situations:

* When a new invoice is created, it will be `draft`.
* An invoice sent to a client by email from the Paymo app will be automatically changed to `sent`.
* When a client opens an invoice with the `sent` status, if will change to `viewed`.
* When the sum of payments for the invoice reaches invoice total, the invoice becomes `paid`.

You can also change the status manually, by making an update request with the new status.

For example, to change the invoice status to `void`, make an update request with the following body:

```json
{
    "status": "void"
}
```

<a name="delete"></a>
## Deleting an invoice

To delete an invoice, make a DELETE request to:

* `/api/invoices/[INVOICE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The invoice object

An invoice object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique invoice identifier
number | text | Invoice number (should be unique throughout all invoices). For keeping a continuous sequence of invoice numbers, Paymo application uses `invoice_format` and `next_invoice_number` values from company settings.
client_id | integer | Id of the client who is invoiced
template_id | integer | Invoice template id used to display the invoice. See [invoice templates](invoice_templates.md) for more info.
status | text | Invoice status. Can be one of the following: `draft`, `sent`, `viewed`, `paid` or `void`
currency | text | Invoice currency code. See the [list of currencies](currencies.md).
date | date | Invoice issue date
due_date | date | Due payment date
subtotal | decimal | _(read-only)_ Invoice subtotal (not including the taxes)
total | decimal | _(read-only)_ Invoice total (including taxes)
tax | decimal | Tax (percentage)
tax_amount | decimal | _(read-only)_ Tax amount
tax2 | decimal | _(optional)_ 2nd tax (percentage)
tax2_amount | decimal | _(read-only)_ 2nd tax amount
tax_on_tax | boolean | If `true` and `tax2` is set, the 2nd tax is applied to invoice subtotal + 1st tax amount, otherwise the 2nd tax is applied to invoice subtotal
language | text | _(deprecated)_ Invoice language (Use invoice templates instead)
bill_to | text | Text block with customer information as it appears on invoice
company_info | text | Text block with provider information as it appears on invoice
footer | text | Text block for footer area of the invoice
notes | text | Text block for notes area (just below the invoice items)
outstanding | decimal | Any outstanding payments for the client. This is just a note to the client and does not add up to invoice total.
tax_text | text | Tax text label (name)
tax2_text | text | 2nd tax text label (name)
title | text | Editable invoice title
pay_online | boolean | If `true` and online payments are configured in company settings, your clients can pay for the invoice through any of the set up providers
reminder_1_sent | boolean | _(read-only)_ This flag that is set to `true` when 1st reminder email was sent to client for the overdue invoice. You can define up to 3 late payment reminders in Invoicing area of Paymo application's company settings
reminder_2_sent | boolean | _(read-only)_ Same as above, but for the 2nd reminder
reminder_3_sent | boolean | _(read-only)_ Same as above, but for the 3rd reminder
permalink | text | _(read-only)_ A link for viewing the invoice that can be accessed by anyone with the link (usually the permalink is sent to clients)
pdf_link | text | _(read-only)_ Same as above, but in pdf format
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice was last updated

<a name="item-object"></a>
## The invoice item (line) object

An invoice item is part of an invoice and has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique invoice item identifier
item | text | Item name
description | text | Item description
price_unit | decimal | Price per unit
quantity | decimal | Item quantity
expense_id | integer | Id of expense that that is invoiced by this invoice item
apply_tax | boolean | If `true` this invoice item is used to compute the tax amount for the invoice
seq | integer | Position (order) of invoice item in the list of all items from the invoice
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice item was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice item was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md) for the invoice object:

Object type|Include key|Relationship
-----------|-----------|----
[Client](clients.md) | client | parent
[Invoice Item](#item-object) | invoiceitems | child
[Invoice Payment](invoice_payments.md) | invoicepayments | child
[Invoice Template](invoice_templates.md) | invoicetemplate | parent

For the invoice item object, the following includes are available:

Object type|Include key|Relationship
-----------|-----------|------------
[Invoice](#object) | invoice | parent
[Expense](expenses.md) | expense | parent
