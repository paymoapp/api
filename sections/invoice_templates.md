# Invoice templates

Invoice templates define how an invoice looks like. That includes the layout, positioning of elements, as well as some texts and labels.
Paymo offers a template gallery for invoices. These include different layouts in different languages. You can import templates from the gallery into your company account from Paymo company settings page, Invoicing sub-section.

* [Listing invoice templates](#list)
* [Listing invoice templates from Paymo library](#list-gallery)
* [Getting an invoice template](#get)
* [Creating an invoice template](#create)
* [Updating an invoice template](#update)
* [Deleting an invoice template](#delete)
* [The invoice template object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Listing invoice templates

By default, your Paymo account will have two invoice templates imported from the templates library.

You can list your templates by making a GET request to:

* `/api/invoicetemplates`

Example of response:

```json
{
    "invoicetemplates": [
        {
            "id": 1130,
            "name": "English - Client on right",
            "title":"INVOICE",
            "is_default": false,
            "html": "<<html template goes in here>>",
            "css": "<<css template goes in here>>",
            "created_on": "2014-11-19T09:45:32Z",
            "updated_on": "2014-11-19T09:45:32Z"
        },
        {
			"id": 1129,
			"name": "English - Client on left",
			"title":"INVOICE",
			"is_default": true,
			"html": "<<html template goes in here>>",
			"css": "<<css template goes in here>>",
			"created_on": "2014-11-19T09:45:32Z",
			"updated_on": "2015-02-26T14:17:48Z"
        }
    ]
}
```

## Listing invoice templates from Paymo library

Templates from the library can be added to your account and used for your invoices.

For a list of all available templates in the Paymo library, make a GET request to:

* `/api/invoicetemplatesgallery`

Example of response:

```json
{
    "invoicetemplatesgallery": [
        {
            "id": 1,
            "name": "English - Client on left",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/invoice-templates-gallery/a2aed6fbca9d292f3ec3d8859a66ef83.jpg",
            "created_on": "2014-10-29T13:38:25Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 2,
            "name": "English - Client on right",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/invoice-templates-gallery/9ae0c5b134a5abdc73f3e25241cd93e8.jpg",
            "created_on": "2014-10-29T13:38:25Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 5,
            "name": "Deutsch - Client on left",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/invoice-templates-gallery/bb5fd4a7298e9acd3400254b84826701.jpg",
            "created_on": "2014-11-03T09:16:28Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 6,
            "name": "Deutsch - Client on right",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/invoice-templates-gallery/56d214e6c349dfe4cdd78558a2e5fd87.jpg",
            "created_on": "2014-11-03T09:19:47Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 13,
            "name": "Español - Client on left",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/invoice-templates-gallery/5b2c9c0f702d1def37af2aeb1e9189b2.jpg",
            "created_on": "2014-11-03T09:58:51Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 14,
            "name": "Español - Client on right",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/invoice-templates-gallery/816273056f7059918f7bde0d7f48c36a.jpg",
            "created_on": "2014-11-03T10:00:18Z",
            "updated_on": "2014-11-19T15:38:31Z"
        }
    ]
}
```

<a name="get"></a>
## Getting an invoice template

To get the invoice template info, make a GET request to:

* `/api/invoicetemplates/[TEMPLATE_ID]`

Example response:

```json
{
    "invoicetemplates": [
        {
            "id": 1130,
            "name": "English - Client on right",
            "title": "INVOICE",
            "is_default": false,
            "html": "<div class=\"invoice\">\r\n\t<div id=\"logo-img\" class=\"left\"></div>\r\n\t<div id=\"company-info\" class=\"right\">\r\n\t\t<div class=\"title\">Provider</div>\r\n\t\t{company_info}\r\n\t</div>\r\n\t<div class=\"right clear\">\r\n\t\t<div id=\"customer\" class=\"title\">\r\n\t\t\t<div>Customer</div>\r\n\t\t\t<!-- {CUSTOMER} ( DO NOT EDIT THIS LINE )-->\r\n\t\t</div>\r\n\t\t<div id=\"bill-to\">{bill_to}</div>\r\n\t</div>\r\n\t<div id=\"single-settings\" class=\"left\">\r\n\t\t<!-- {CUSTOM_FIELDS_START} ( DO NOT EDIT THIS LINE )-->\r\n\t\t<table>\r\n\t\t\t<thead>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th id=\"invoice-number-label\" class=\"label\">Invoice No.</th>\r\n\t\t\t\t\t<th id=\"invoice-number-value\" class=\"value\">{number}</th>\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr id=\"date-row\">\r\n\t\t\t\t\t<td id=\"date-label\" class=\"label\">Date</td>\r\n\t\t\t\t\t<td id=\"date-value\" class=\"value\">{date}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td id=\"due-date-label\" class=\"label\">Due Date</td>\r\n\t\t\t\t\t<td id=\"due-date-value\">{due_date}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t\t<!-- {CUSTOM_FIELDS_END} ( DO NOT EDIT THIS LINE )-->\r\n\t</div>\r\n\t<!-- {EXPENSE_BUTTON_WRAPPER} ( DO NOT EDIT THIS LINE )-->\r\n\t<div id=\"invoice-title\" class=\"clear\">{title}</div>\r\n\t<div id=\"items\">\r\n\t\t<table id=\"items-table\">\r\n\t\t\t<thead id=\"items-header\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<!-- {HEADER_ACF} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t\t<th class=\"item\">Item</th>\r\n\t\t\t\t\t<th class=\"description\">Description</th>\r\n\t\t\t\t\t<th class=\"price-unit\">Price/Unit</th>\r\n\t\t\t\t\t<th class=\"quantity\">Quantity</th>\r\n\t\t\t\t\t<th class=\"price\">Price</th>\r\n\t\t\t\t\t<!-- {HEADER_ACL} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody id=\"items-body\">\r\n\t\t\t\t<!-- {INVOICE_ROWS_START} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t<tr class=\"item-row\" id=\"{row_id}\">\r\n\t\t\t\t\t<!-- {ROW_ACF} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t\t<td class=\"item\" >{item}</td>\r\n\t\t\t\t\t<td class=\"description\">{description}</td>\r\n\t\t\t\t\t<td class=\"price-unit\">{price_unit}</td>\r\n\t\t\t\t\t<td class=\"quantity\">{quantity}</td>\r\n\t\t\t\t\t<td class=\"price\">{price}</td>\r\n\t\t\t\t\t<!-- {ROW_ACL} (DO NOT EDIT THIS LINE)-->\r\n\t\t\t\t</tr>\r\n\t\t\t\t<!-- {INVOICE_ROWS_END} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<div class=\"section\">\r\n\t\t<div id=\"totals\" class=\"right\">\r\n\t\t\t<table>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr {check_subtotal_hide}>\r\n\t\t\t\t\t\t<td class=\"label\" id=\"subtotal-label\">Subtotal</td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"subtotal\">{subtotal}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr {check_tax_hide}>\r\n\t\t\t\t\t\t<td id=\"tax-value-label\" class=\"label\"><span id = \"tax-text\">{tax_text}</span><span id=\"tax-percent-value\">{tax}</span></td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"tax-value\">{tax_value}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr {check_tax2_hide}>\r\n\t\t\t\t\t\t<td id=\"tax2-value-label\" class=\"label\"><span id = \"tax2-text\">{tax2_text}</span><span id=\"tax-percent-value\">{tax2}</span></td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"tax2-value\">{tax2_value}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr class=\"highlighted\">\r\n\t\t\t\t\t\t<td id=\"total-label\" class=\"label\">Total</td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"total\">{total}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<!-- {OUTSTANDING_START} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t\t<tr {hide_outstanding_balance} id=\"outstanding-balance\">\r\n\t\t\t\t\t\t<td class=\"label\">Outstanding Balance</td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"outstanding-balance-value\">{outstanding}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr class=\"highlighted\" {hide_grand_total}><td class=\"label\">Grand Total</td>\r\n\t\t\t\t\t\t<td class=\"right-align\" id=\"grand-total-value\">{grand_total_value}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<!-- {OUTSTANDING_END} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<!-- {BUTTONS_WRAPPER} ( DO NOT EDIT THIS LINE )-->\r\n\t</div>\r\n\t<div id=\"footer\" class=\"clear\">{footer}</div>\r\n\t<div id=\"invoice-brand\">Sent using <a href=\"http://www.paymoapp.com/?utm_source=invoice_footer&utm_medium=inv&utm_campaign=invoice_footer\" target=\"_blank\">paymoapp.com</a></div>\r\n</div>",
            "css": "",
            "created_on": "2014-11-19T09:45:32Z",
            "updated_on": "2014-11-19T09:45:32Z"
        }
    ]
}
```

<a name="create"></a>
## Creating an invoice template

To create an invoice template, make a POST request to:

* `/api/invoicetemplates`

with the request body containing the new template info. 

Sample request body to create a template with a custom invoice title color:

```json
{
	"name": "Template with custom title color",
	"title": "INVOICE",
	"is_default": false,
	"html": "<<use the html code of an invoice template from Paymo library>>",
	"css": "#invoice-title { color: #999; }"	
}
```

The `html` attribute contains an HTML template code with special placeholders for key invoice elements.
Placeholders look like `{PLACEHOLDER_NAME}` and will be replace with corresponding invoice property.
There are also blocks of HTML code with special meanings. These look like `<!-- {BLOCK_START} (DO NOT EDIT THIS LINE) -->`.

The `css` attribute contains _additional_ CSS rules to apply to invoice HTML template code. This is the field we recommend you use to customize how the invoice will look.

Because the invoice template is a complex structure, we recommend to use an existing `html` content and add any desired changes through the `css` field.

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new invoice template. The response body will contain the new invoice template info as in the **Getting an invoice template** section.

### Required fields

When creating an invoice template: `name`.
For a complete description of all invoice template fields, see [invoice template object](#object).

<a name="update"></a>
## Updating an invoice template

To update an existing invoice template, make a POST or PUT request to:

* `/api/invoicetemplates/[TEMPLATE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to hide the footer from the invoice:

```json
{
	"css": "#footer { display: none; }"
}
```

### Changing the default invoice template

One of your invoice template is the default template used when creating a new invoice, of when displaying an invoice that has no template set.

You can change the default invoice template by making an update request for the new default template with the `is_default` attribute set to `true`. 

Example of request body:

```json
{
	"is_default": true
}
```

The old default invoice template will have the `is_default` set to `false`.

<a name="delete"></a>
## Deleting an invoice template

You can only delete an invoice template if there are no invoices using this template and the template is not the default one.

To delete an invoice template, make a DELETE request to:

* `/api/invoicetemplates/[TEMPLATE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The invoice template object

An invoice template object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique template identifier
name | text | Template name
title | text | Default invoice title (this is copied from invoice_templates_gallery when company add new invoice_template)
html | text | HTML template code
css | text | Additional CSS code (basic CSS rules for invoices are already included by Paymo)
is_default | boolean | If `true`, this template is the default invoice template for your company
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice template was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the invoice template was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Invoice](invoices.md) | invoices | child
