# Invoice Recurring Profiles

* [Getting invoice recurring profiles](#list)
* [Getting an invoice recurring profile](#get)
* [Creating an invoice recurring profile](#create)
* [Invoice creation from recurring profiles](#invoice-creation)
* [Updating an invoice recurring profile](#update)
* [Deleting an invoice recurring profile](#delete)
* [The invoice recurring profile object](#object)
* [Dependent objects](#dependencies)

Invoice recurring profiles allow you to set up a schedule for invoice creation along with invoice details. Elements
like invoice items and taxes, client and billing info are copied from recurring profile. Other elements like invoice
number and invoice date and due date are set at the moment of creation based on company settings for invoicing.

<a name="list"></a>

## Getting invoice recurring profiles

You can list invoice recurring profiles by making a GET request to:

* `/api/recurringprofiles` for a list of all the invoice recurring profiles
* `/api/recurringprofiles?where=client_id=[CLIENT_ID]` for a list of invoice recurring profiles for a specific client
* `/api/recurringprofiles?where=total>100` for a list of all invoice recurring profiles with a total greater than 100

The list above is not exhausted. You can combine multiple conditions as in:

* `/api/recurringprofiles?where=client_id=[CLIENT_ID] and total>100` for a list of invoice recurring profiles for a
  specific client with a total greater than 100

Example of response:

```json
{
	"recurringprofiles": [
		{
			"id": 5763,
			"client_id": 319023,
			"template_id": null,
			"title": "INVOICE",
			"currency": "USD",
			"subtotal": 60,
			"total": 60,
			"tax": 0,
			"tax2": 0,
			"tax_amount": 0,
			"tax2_amount": 0,
			"discount": 0,
			"discount_amount": 0,
			"discount_text": "Discount",
			"tax_on_tax": false,
			"start_date": "2020-02-02",
			"frequency": "w",
			"occurrences": 3,
			"last_created": "2020-02-02",
			"invoices_created": 1,
			"autosend": true,
			"language": null,
			"bill_to": "Best Buy Co., Inc.\r\nBrian J. Dunn\r\n\r\nRichfield, Minnesota\r\nUSA",
			"company_info": "Dunder Mifflin\r\nAcademy St\r\nScranton, PA 18504\r\nmichael@dundermifflin.com\r\n+015641789891",
			"footer": "Thank you for your business",
			"notes": "",
			"tax_text": "V.A.T.",
			"tax2_text": "Tax2",
			"pay_online": false,
			"created_on": "2020-02-02T10:52:29Z",
			"updated_on": "2020-02-28T07:12:51Z",
			"send_attachment": false,
			"options": null
		}
	]
}
```

You can also [include related content](includes.md) when listing invoice recurring profile.

<a name="get"></a>

## Getting an invoice recurring profile

To get the invoice recurring profile info, make a GET request to:

* `/api/recurringprofiles/[PROFILE_ID]` will return just the invoice recurring profile subtotals/totals/tax amounts, not
  the invoice recurring profile items
* `/api/recurringprofiles/[PROFILE_ID]?include=recurringprofileitems` will include invoice recurring profile items (
  lines) information

Example response:

```json
{
	"recurringprofiles": [
		{
			"id": 5763,
			"client_id": 319023,
			"template_id": null,
			"title": "INVOICE",
			"currency": "USD",
			"subtotal": 60,
			"total": 60,
			"tax": 0,
			"tax2": 0,
			"tax_amount": 0,
			"tax2_amount": 0,
			"discount": 0,
			"discount_amount": 0,
			"discount_text": "Discount",
			"tax_on_tax": false,
			"start_date": "2020-02-02",
			"frequency": "w",
			"occurrences": 3,
			"last_created": "2020-02-02",
			"invoices_created": 1,
			"autosend": true,
			"language": null,
			"bill_to": "Best Buy Co., Inc.\r\nBrian J. Dunn\r\n\r\nRichfield, Minnesota\r\nUSA",
			"company_info": "Dunder Mifflin\r\nAcademy St\r\nScranton, PA 18504\r\nmichael@dundermifflin.com\r\n+015641789891",
			"footer": "Thank you for your business",
			"notes": "",
			"tax_text": "V.A.T.",
			"tax2_text": "Tax2",
			"pay_online": false,
			"created_on": "2020-02-02T10:52:29Z",
			"updated_on": "2020-02-28T07:12:51Z",
			"send_attachment": false,
			"options": null,
			"recurringprofileitems": [
				{
					"id": 8233,
					"recurring_profile_id": 5763,
					"item": "Item A",
					"description": "Item description",
					"price_unit": 20,
					"quantity": 3,
					"apply_tax": true,
					"seq": null,
					"created_on": "2020-02-02T10:52:29Z",
					"updated_on": "2020-02-02T10:52:29Z"
				}
			]
		}
	]
}
```

You can also [include related content](includes.md) when getting an invoice recurring profile.

<a name="create"></a>

## Creating an invoice recurring profile

To create an invoice recurring profile, make a POST request to:

* `/api/recurringprofiles`

with the request body containing the new invoice recurring profile info including the invoice recurring profile items
(lines), as in the example below:

```json
{
	"client_id": 319023,
	"currency": "USD",
	"frequency": "m",
	"start_date": "2020-03-01",
	"company_info": "Company Info\nMore info",
	"bill_to": "Billing Info\nMore info",
	"tax": 20,
	"items": [
		{
			"item": "Item 1",
			"description": "Description & specs for item 1",
			"price_unit": 10,
			"quantity": 2
		},
		{
			"item": "Item 2",
			"description": "Description\nFor Item 2",
			"price_unit": 30,
			"quantity": 1
		}
	]
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new
invoice recurring profile. The response body will contain the new invoice recurring profile info as in
the **Getting an invoice recurring profile** section.

### Required fields

When creating an invoice recurring profile: `client_id`, `currency`, `frequency`, `start_date`.
For a complete description of all invoice recurring profile fields, see [invoice recurring profile object](#object).

### Invoice recurring profile items

Invoice recurring profile items are defined in `items` property of the request object. It is an array of objects, each
one having the following keys:

* `item` represents the name of the item
* `description` (optional) more details about the item
* `price_unit` (decimal) price per unit (the currency is the same as that of the invoice recurring profile)
* `quantity` (decimal) item quantity
* `apply_tax` (boolean) (optional) whether or not to apply tax to this item
* `seq` (int) (optional) specifies the position of this item in the items list

<a name="invoice-creation"></a>
## Invoice creation from recurring profiles

Invoices from recurring profiles are created daily at 9 AM UTC. In order for an invoice to be created from a recurring
profile, the following criteria should be met:

* `invoices_created` should not exceed `occurrences`, or be `null`
* current date should be after or equal to `start_date`
* current date should be reached by adding a number of `frequency` interval days to the `start_date`

<a name="update"></a>

## Updating an invoice recurring profile

To update an existing invoice recurring profile, make a POST or PUT request to:

* `/api/recurringprofiles/[PROFILE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to change the footer and 'bill to' info:

```json
{
	"footer": "Thank you for your business",
	"bill_to": "Acme, Inc.\nSan Jose, CA"
}
```

The response will return `200 OK` and will contain the updated invoice recurring profile info as in the **Getting an
invoice recurring profile** section.

## Updating invoice recurring profile items

When updating an invoice recurring profile you can also add/update/remove any items.
If the update request has an `items` field, this will set the new invoice recurring profile items.

For example, if we update an invoice recurring profile with 3 items with IDs equal to 100, 101, 102 and we want to:

* keep item with ID=100 unchanged
* modify `quantity` to 2 for item with ID=101
* remove item with ID=102
* add new item with `price`=20 and `qty`=1

the update request will look like:

```json
{
	"items": [
		{
			"id": 100
		},
		{
			"id": 101,
			"quantity": 2
		},
		{
			"item": "New item",
			"price_unit": 20,
			"quantity": 1
		}
	]
}
```

After any update the invoice recurring profile `subtotal`, `tax_amount`, `tax2_amount`, `discount_amount` and `total`
fields will also be updated.

<a name="delete"></a>

## Deleting an invoice recurring profile

To delete an invoice recurring profile, make a DELETE request to:

* `/api/recurringprofile/[PROFILE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>

## The invoice recurring profile object

An invoice recurring profile object has the following attributes:

| Attribute       | Type                    |Description
|-----------------|-------------------------|-----------
| id              | integer                 | _(read-only)_ Unique invoice recurring profile identifier
| client_id       | integer                 | Id of the client
| template_id     | integer                 | Invoice template id. See [invoice templates](invoice_templates.md) for more info.
| currency        | text                    | Currency code. See the [list of currencies](currencies.md).
| start_date      | date                    | After this date recurring profiles are enabled and invoices may be created from it
| frequency       | text                    | Frequency interval for invoice creation. Can be one of the following values: 
|                 |                         | `w` for weekly recurrence, starting at `start_date` 
|                 |                         | `2w`, `3w` or `4w` for every two, three or four weeks recurrence
|                 |                         | `m` for monthly recurrence
|                 |                         | `2m`, `3m` or `6m` for every two, three or six month recurrence
|                 |                         | `y` for yearly recurrence
| occurences      | integer                 | Maximal number of invoices to be created from recurring profile. If `null` then there is no limit for number of invoices.
| last_created    | date                    | _(read-only)_ Date of last created invoice from recurring profile
| invoice_created | integer                 | _(read-only)_ Number of invoices created from recurring profile
| autosend        | boolean                 | If `true`, newly created invoices are sent automatically to client
| subtotal        | decimal                 | _(read-only)_ Invoice subtotal (not including the taxes)
| total           | decimal                 | _(read-only)_ Invoice total (including taxes)
| tax             | decimal                 | Tax (percentage)
| tax_amount      | decimal                 | _(read-only)_ Tax amount
| tax2            | decimal                 | _(optional)_ 2nd tax (percentage)
| tax2_amount     | decimal                 | _(read-only)_ 2nd tax amount
| discount        | decimal                 | Discount (percentage)
| discount_amount | decimal                 | _(read-only)_ Discount amount
| tax_on_tax      | boolean                 | If `true` and `tax2` is set, the 2nd tax is applied to invoice subtotal + 1st tax amount, otherwise the 2nd tax is applied to invoice subtotal
| language        | text                    | _(deprecated)_ Invoice language (Use invoice templates instead)
| bill_to         | text                    | Text block with customer information as it appears on invoice
| company_info    | text                    | Text block with provider information as it appears on invoice
| footer          | text                    | Text block for footer area of the invoice
| notes           | text                    | Text block for "internal" notes area (just below items, not visible on invoice)
| tax_text        | text                    | Tax text label (name)
| tax2_text       | text                    | 2nd tax text label (name)
| discount_text   | text                    | Discount text label
| title           | text                    | Invoice title
| pay_online      | boolean                 | If `true` and online payments are configured in company settings, your clients can pay for the invoice through any of the set up providers
| created_on      | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice recurring profile was created
| updated_on      | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice recurring profile was last updated

<a name="item-object"></a>

## The invoice recurring profile item (line) object

An item is part of an invoice recurring profile and has the following attributes:

| Attribute   | Type                    | Description
|-------------|-------------------------|-----------
| id          | integer                 | _(read-only)_ Unique invoice recurring profile item identifier
| item        | text                    | Item name
| description | text                    | Item description
| price_unit  | decimal                 | Price per unit
| quantity    | decimal                 | Item quantity
| apply_tax   | boolean                 | If `true` this item is used to compute the tax amount
| seq         | integer                 | Position (order) of item in the list of all items
| created_on  | [datetime](datetime.md) | _(read-only)_ Date and time when the item was created
| updated_on  | [datetime](datetime.md) | _(read-only)_ Date and time when the item was last updated

<a name="dependencies"></a>

## Dependent objects

The following object types can be used in [includes](includes.md) for the invoice object:

| Object type                                    | Include key           | Relationship
|------------------------------------------------|-----------------------|----
| [Client](clients.md)                           | client                | parent
| [Invoice Recurring Profile Item](#item-object) | recurringprofileitems | child

For the invoice recurring profile item object, the following includes are available:

 Object type                           | Include key      |Relationship
---------------------------------------|------------------|------------
| [Invoice Recurring Profile](#object) | recurringprofile | parent
