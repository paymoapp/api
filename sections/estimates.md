# Estimates

* [Getting estimates](#list)
* [Getting an estimate](#get)
* [Creating an estimate](#create)
* [Updating an estimate](#update)
* [Deleting an estimate](#delete)
* [The estimate object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Getting estimates

You can list estimates by making a GET request to:

* `/api/estimates` for a list of all the estimates
* `/api/estimates?where=client_id=[CLIENT_ID]` for a list of estimates for a specific client
* `/api/estimates?where=status=paid` for a list of paid estimates
* `/api/estimates?where=status in ("draft","void")` for a list of all draft and void estimates
* `/api/estimates?where=total>100` for a list of all estimates with a total greater than 100

The list above is not exhausted. You can combine multiple conditions as in:

* `/api/estimates?where=client_id=[CLIENT_ID] and status=draft` for a list of draft estimates for a specific client

Example of response:

```json
{
   "estimates":[
      {
		"id": 1498,
		"client_id": 10874,
		"template_id": null,
		"number": "#EST-20130729-7",
		"status": "draft",
		"currency": "USD",
		"bill_to": "AT&T Inc.\n809 Nueces Bay Blvd,\nDallas, Texas 78469\nUS",
		"company_info": "Dunder Mifflin\nAcademy St\nScranton, PA 18504\nmichael@dundermifflin.com\n+015641789891",
		"footer": "",
		"date": "2013-07-29",
		"subtotal": 9150,
		"total": 9424.5,
		"tax": 3,
		"tax2": 0,
		"tax_amount": 274.5,
		"tax2_amount": 0,
		"tax_on_tax": true,
		"tax_text": "V.A.T.",
		"tax2_text": "Tax2",
		"title": "INVOICE",
		"language": "",
		"invoice_id": null,
		"notes": "",
		"created_on": "2013-07-29T13:35:56Z",
		"updated_on": "2014-11-19T15:40:12Z",
		"download_token": "Ey5kC8A/GYbD8nu47EOzQJY1TbKGU7kAPcwkc9dU64z1Bsmbvyjlb4F7XNzPesEitpqXywBBNSSEWPApkl3BVw==",
		"permalink": "https://app.paymoapp.com/api/estimates/1498/?token=r2YkY3xCb1dH5UMXGvLrPo0%2FCvXuGhHfGq0K8o91u%2BOMxt0FZ1qjAzVMWz46J2Sde9x4CcY9VeRwovJnmoyi2oWEc9YzTQO0dmd5i9iI9ro%3D&format=html"
      },
      {
		"id": 1500,
        "client_id": 10875,
        "template_id": null,
        "number": "#EST-20130729-9",
        "status": "sent",
        "currency": "USD",
        "bill_to": "Best Buy Co., Inc.\n7601 Penn Ave S\nRichfield, Minnesota 55423\nUS",
        "company_info": "Dunder Mifflin\nAcademy St\nScranton, PA 18504\nmichael@dundermifflin.com\n+015641789891\nTest Fiscal information",
        "footer": "Thank you for your business. Created using the Paymoapp.com time tracking and invoicing application.",
        "date": "2014-10-29",
        "subtotal": 8540,
        "total": 9394,
        "tax": 10,
        "tax2": 0,
        "tax_amount": 854,
        "tax2_amount": 0,
        "tax_on_tax": true,
        "tax_text": "Tax",
        "tax2_text": "",
        "title": "INVOICE",
        "language": "",
        "invoice_id": null,
        "notes": "",
        "created_on": "2013-07-29T13:39:15Z",
        "updated_on": "2014-11-11T15:00:22Z",
        "download_token": "BMlgSkT04qd7WMAH+YGI6ux/qLiZVeKxfv3psBWvZWkIOBpBHgDZuozxpbI1x+DCEoNVw6jWPojGXInHuiZfrA==",
        "permalink": "https://app.paymoapp.com/api/estimates/1500/?token=g9OYdh7uhmLYZl2oBYNI6yq%2BwME0D3MLKGHeCUKe6p7yQCWX1NQKrqeqo0puYXE68DTc%2BMaI1DpOOYvgxkCdRT1nBBp5Vit2vcn8sV72dWs%3D&format=html"
	  }
  ]
}
```

You can also [include related content](includes.md) when listing estimates.

<a name="get"></a>
## Getting an estimate

To get the estimate info, make a GET request to:

* `/api/estimates/[ESTIMATE_ID]` will return just the estimate subtotals/totals/tax amounts, not the estimate items
* `/api/estimates/[ESTIMATE_ID]?include=estimateitems` will include estimate items (lines) information

Example response:

```json
{
  "estimates": [
    {
      "id": 1500,
      "client_id": 10875,
      "template_id": null,
      "number": "#EST-20130729-9",
      "status": "sent",
      "currency": "USD",
      "bill_to": "Best Buy Co., Inc.\n7601 Penn Ave S\nRichfield, Minnesota 55423\nUS",
      "company_info": "Dunder Mifflin\nAcademy St\nScranton, PA 18504\nmichael@dundermifflin.com\n+015641789891\nTest Fiscal information",
      "footer": "Thank you for your business. Created using the Paymoapp.com time tracking and invoicing application.",
      "date": "2014-10-29",
      "subtotal": 8540,
      "total": 9394,
      "tax": 10,
      "tax2": 0,
      "tax_amount": 854,
      "tax2_amount": 0,
      "tax_on_tax": true,
      "tax_text": "Tax",
      "tax2_text": "",
      "title": "INVOICE",
      "language": "",
      "invoice_id": null,
      "notes": "",
      "created_on": "2013-07-29T13:39:15Z",
      "updated_on": "2014-11-11T15:00:22Z",
      "download_token": "InMy585L20aoz9IMz5frWhJ0mJOCTae1zQIzHkdGK4VDlZWMHLkTRpK8aStBxMxLbV/WlgCxLgk8Kjemll7Ujw==",
      "permalink": "https://app.paymoapp.com/api/estimates/1500/?token=g9OYdh7uhmLYZl2oBYNI6yq%2BwME0D3MLKGHeCUKe6p7yQCWX1NQKrqeqo0puYXE68DTc%2BMaI1DpOOYvgxkCdRT1nBBp5Vit2vcn8sV72dWs%3D&format=html",
      "estimateitems": [
        {
          "id": 5277,
          "estimate_id": 1500,
          "item": "Logo",
          "description": "research, creation",
          "price_unit": 40,
          "quantity": 20,
          "apply_tax": true,
          "seq": null,
          "created_on": "2013-07-29T13:39:15Z",
          "updated_on": "2014-07-23T14:22:05Z"
        },
        {
          "id": 5278,
          "estimate_id": 1500,
          "item": "Header",
          "description": "research, creation, focus group",
          "price_unit": 30,
          "quantity": 18,
          "apply_tax": true,
          "seq": 1,
          "created_on": "2013-07-29T13:39:16Z",
          "updated_on": "2014-07-23T14:22:05Z"
        },
        {
          "id": 5279,
          "estimate_id": 1500,
          "item": "Mobile version",
          "description": "coding, design etc",
          "price_unit": 30,
          "quantity": 240,
          "apply_tax": true,
          "seq": 2,
          "created_on": "2013-07-29T13:39:16Z",
          "updated_on": "2014-07-23T14:22:05Z"
        }
      ]
    }
  ]
}
```

You can also [include related content](includes.md) when getting an estimate.

<a name="create"></a>
## Creating an estimate

To create an estimate, make a POST request to:

* `/api/estimates`

with the request body containing the new estimate info including the estimate items (lines), as in the example below:

```json
{
   "date":"2015-02-24",
   "due_date":"2015-03-24",
   "client_id":10869,
   "currency":"USD",
   "number":"EST-488",
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

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new estimate. The response body will contain the new estimate info as in the **Getting an estimate** section.

### Required fields

When creating an estimate: `client_id`, `currency`.
For a complete description of all estimate fields, see [estimate object](#object).

### Estimate items 

Estimate items are defined in `items` property of the request object. It is an array of objects, each one having the following keys:

* `item` represents the name of the estimate item
* `description` (optional) more details about the item
* `price_unit` (decimal) price per unit (the currency is the same as that of the estimate)
* `quantity` (decimal) item quantity
* `apply_tax` (boolean) (optional) whether or not to apply tax to this item (usually tax does not apply for expenses)
* `seq` (int) (optional) specifies the position of this estimate item among the items list

### Estimate number

When creating an estimate, if you don't provide an estimate number, Paymo will automatically create one using the number format and next estimate number from Company Settings (`estimate_format` and `next_estimate_number` attributes of the company object).

If you provide your custom number, this number will be checked against existing estimate number. In case there is already an estimate with the provided number, the creation of the new estimate will fail.
After each new estimate is created (either the estimate number is automatically assigned or custom defined) the value of `next_estimate_number` will be incremented.

<a name="update"></a>
## Updating an estimate

To update an existing estimate, make a POST or PUT request to:

* `/api/estimates/[ESTIMATE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the estimate footer and 'bill to' info:

```json
{
    "footer": "Thank you for your business",
    "bill_to": "Acme, Inc.\nSan Jose, CA"
}
```

The response will return `200 OK` and will contain the updated estimate info as in the **Getting an estimate** section.

## Changing estimate status

An estimate can be in one of the following states: `draft`, `sent`, `viewed`, `accepted`, `invoiced` and `void`.
Estimate status will change automatically in some situations:

* When a new estimate is created, it will be `draft`.
* An estimate sent to a client by email from the Paymo app will be automatically changed to `sent`.
* When a client opens an estimate with the `sent` status, if will change to `viewed`.
* An estimate accepted by the client from the estimate permalink page will change status to `accepted`.
* After an invoice was created from the estimate, the status will change to `invoiced`.

You can also change the status manually, by making an update request with the new status.

For example, to change the estimate status to `void`, make an update request with the following body:

```json
{
    "status": "void"
}
```

<a name="delete"></a>
## Deleting an estimate

To delete an estimate, make a DELETE request to:

* `/api/estimates/[ESTIMATE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The estimate object

An estimate object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique estimate identifier
number | text | Estimate number (should be unique throughout all estimates). For keeping a continuous sequence of estimate numbers, Paymo application uses `estimate_format` and `next_estimate_number` values from company settings.
client_id | integer | Id of the client 
template_id | integer | Estimate template id used to display the estimate. See [estimate templates](estimate_templates.md) for more info.
status | text | Estimate status. Can be one of the following: `draft`, `sent`, `viewed`, `accepted`, `invoiced` or `void`
currency | text | Estimate currency code. See the [list of currencies](currencies.md).
date | date | Estimate issue date
subtotal | decimal | _(read-only)_ Estimate subtotal (not including the taxes)
total | decimal | _(read-only)_ Estimate total (including taxes)
tax | decimal | Tax (percentage)
tax_amount | decimal | _(read-only)_ Tax amount 
tax2 | decimal | _(optional)_ 2nd tax (percentage) 
tax2_amount | decimal | _(read-only)_ 2nd tax amount
tax_on_tax | boolean | If `true` and `tax2` is set, the 2nd tax is applied to estimate subtotal + 1st tax amount, otherwise the 2nd tax is applied to estimate subtotal
language | text | _(deprecated)_ Estimate language (Use estimate templates instead) 
bill_to | text | Text block with customer information as it appears on estimate
company_info | text | Text block with provider information as it appears on estimate
footer | text | Text block for footer area of the estimate
notes | text | Text block for "internal" notes area (not shown on the estimate)
tax_text | text | Tax text label (name)
tax2_text | text | 2nd tax text label (name)
title | text | Editable estimate title
brief_description | text | Text block for notes/description area (above/below the estimate items based on template)
discount | decimal | Discount (percentage)
discount_amount | decimal | _(read-only)_ Discount amount
discount_text | text | Discount text label (name)
invoice_id | integer | _(optional)_ Id of the invoice that was created from this estimate
permalink | text | _(read-only)_ A link for viewing the estimate that can be accessed by anyone with the link (usually the permalink is sent to clients)
pdf_link | text | _(read-only)_ Same as above, but in pdf format
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the estimate was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the estimate was last updated

<a name="item-object"></a>
## The estimate item (line) object

An estimate item is part of an estimate and has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique estimate item identifier
item | text | Item name
description | text | Item description
price_unit | decimal | Price per unit 
quantity | decimal | Item quantity
apply_tax | boolean | If `true` this estimate item is used to compute the tax amount for the estimate
seq | integer | Position (order) of estimate item in the list of all items from the estimate
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the estimate item was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the estimate item was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md) for the estimate object:

Object type|Include key|Relationship
-----------|-----------|----
[Client](clients.md) | client | parent
[Invoice](invoices.md) | invoice | parent
[Estimate Item](#item-object) | estimateitems | child
[Estimate Template](estimate_templates.md) | estimatetemplate | parent

For the estimate item object, the following includes are available:

Object type|Include key|Relationship
-----------|-----------|------------
[Estimate](#object) | estimate | parent
