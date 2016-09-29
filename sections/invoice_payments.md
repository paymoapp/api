# Invoice payments

* [Listing invoice payments](#list)
* [Getting an invoice payment](#get)
* [Creating an invoice payment](#create)
* [Updating an invoice payment](#update)
* [Deleting an invoice payment](#delete)
* [The invoice payment object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Listing invoice payments

You can list payments by making a GET request to:

* `/api/invoicepayments` for a list of all payments
* `/api/invoicepayments?where=invoice_id=[INVOICE_ID]` for a list of payments for an invoice

Example of response:

```json
{
  "invoicepayments": [
    {
      "id": 64547,
      "invoice_id": 9876,
      "amount": 15.25,
      "date": "2016-09-28",
      "notes": "",
      "created_on": "2016-09-28T19:20:03Z",
      "updated_on": "2016-09-28T19:20:03Z"
    },
    {
      "id": 64548,
      "invoice_id": 9876,
      "amount": 10,
      "date": "2016-09-29",
      "notes": "",
      "created_on": "2016-09-29T09:31:41Z",
      "updated_on": "2016-09-29T09:31:41Z"
    }
  ]
}
```

<a name="get"></a>
## Getting an invoice payment

To get the invoice payment info, make a GET request to:

* `/api/invoicepayments/[PAYMENT_ID]`

Example response:

```json
{
  "invoicepayments": [
    {
      "id": 64547,
      "invoice_id": 9876,
      "amount": 15.25,
      "date": "2016-09-28",
      "notes": "",
      "created_on": "2016-09-28T19:20:03Z",
      "updated_on": "2016-09-28T19:20:03Z"
    }
  ]
}
```

<a name="create"></a>
## Adding an invoice payment

To add an invoice payment, make a POST request to:

* `/api/invoicepayments`

with the request body containing the new payment info.

Sample request body to create a payment of 10 USD (currency is set in the invoice):

```json
{
	"invoice_id": 64549,
	"amount": 10
}
```

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new invoice payment. The response body will contain the new invoice payment info as in the **Getting an invoice payment** section.

Add payment request will fail if the payment amount is greater than the remaining amount to be paid for the invoice.

### Required fields

When creating an invoice payment: `invoice_id` and `amount`.
For a complete description of all invoice payment fields, see [invoice payment object](#object).

### Changing invoice status to paid

After adding a payment, if the sum of all the payments for the invoice equals the invoice total, the invoice will change its status to `paid` automatically.

<a name="update"></a>
## Updating an invoice payment

To update an existing invoice payment, make a POST or PUT request to:

* `/api/invoicepayments/[PAYMENT_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to add a not for the payment:

```json
{
	"note": "A note for the payment"
}
```

### Changing invoice status after updating a payment

After updating an invoice payment amount, the invoice status might change depending on the new sum of payments for the invoice.

If the sum of all invoice payments equals the invoice total, the invoice status will change to `paid`.

If the invoice had a status of `paid` and the sum of all invoice payments becomes less than the invoice total, the invoice status will change from `paid` to `viewed`.

<a name="delete"></a>
## Deleting an invoice payment

To delete an invoice payment, make a DELETE request to:

* `/api/invoicepayments/[PAYMENT_ID]`

If successful, the response will have a `200 OK` status code.

### Changing invoice status after deleting a payment

If the invoice had a status of `paid` and the sum of all invoice payments becomes less than the invoice total, the invoice status will change from `paid` to `viewed`.

<a name="object"></a>
## The invoice payment object

An invoice payment object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique payment identifier
invoice_id | integer | _(read-only)_ Id of the invoice this payment belongs to
date | date | A user set date of the payment
notes | text | Payment notes or description
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice payment was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice payment was last updated

Note that the invoice payment has no `currency` attribute. It has the same currency as the invoice it belongs to.

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Invoice](invoices.md) | invoice | parent
