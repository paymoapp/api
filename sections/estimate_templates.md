# Estimate templates

Estimate templates define how an estimate looks like. That includes the layout, positioning of elements, as well as some texts and labels.
Paymo offers a template gallery for estimates. These include different layouts in different languages. You can import templates from the gallery into your company account from Paymo company settings page, Invoicing sub-section.

* [Listing estimate templates](#list)
* [Listing estimate templates from Paymo library](#list-gallery)
* [Getting an estimate template](#get)
* [Creating an estimate template](#create)
* [Updating an estimate template](#update)
* [Deleting an estimate template](#delete)
* [The estimate template object](#object)
* [Dependent objects](#dependencies)

<a name="list"></a>
## Listing estimate templates

By default, your Paymo account will have two estimate templates imported from the templates library.

You can list your templates by making a GET request to:

* `/api/estimatetemplates`

Example of response:

```json
{
    "estimatetemplates": [
        {
            "id": 1230,
            "name": "English - Client on right",
            "title": "INVOICE",
            "is_default": false,
            "html": "<<html template goes in here>>",
            "css": "<<css template goes in here>>",
            "created_on": "2014-11-19T09:45:32Z",
            "updated_on": "2014-11-19T09:45:32Z"
        },
        {
			"id": 1229,
			"name": "English - Client on left",
			"title": "INVOICE",
			"is_default": true,
			"html": "<<html template goes in here>>",
			"css": "<<css template goes in here>>",
			"created_on": "2014-11-19T09:45:32Z",
			"updated_on": "2015-02-26T14:17:48Z"
        }
    ]
}
```

## Listing estimate templates from Paymo library

Templates from the library can be added to your account and used for your estimates.

For a list of all available templates in the Paymo library, make a GET request to:

* `/api/estimatetemplatesgallery`

Example of response:

```json
{
    "estimatetemplatesgallery": [
        {
            "id": 1,
            "name": "English - Client on left",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/estimate-templates-gallery/a2aed6fbca9d292f3ec3d8859a66ef83.jpg",
            "created_on": "2014-10-29T13:38:25Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 2,
            "name": "English - Client on right",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/estimate-templates-gallery/9ae0c5b134a5abdc73f3e25241cd93e8.jpg",
            "created_on": "2014-10-29T13:38:25Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 5,
            "name": "Deutsch - Client on left",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/estimate-templates-gallery/bb5fd4a7298e9acd3400254b84826701.jpg",
            "created_on": "2014-11-03T09:16:28Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 6,
            "name": "Deutsch - Client on right",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/estimate-templates-gallery/56d214e6c349dfe4cdd78558a2e5fd87.jpg",
            "created_on": "2014-11-03T09:19:47Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 13,
            "name": "Español - Client on left",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/estimate-templates-gallery/5b2c9c0f702d1def37af2aeb1e9189b2.jpg",
            "created_on": "2014-11-03T09:58:51Z",
            "updated_on": "2014-11-19T15:38:31Z"
        },
        {
            "id": 14,
            "name": "Español - Client on right",
            "title": "INVOICE",
            "html": "<<html template goes in here>>",
            "css": "<css template goes in here>>",
            "image": "https://app.paymoapp.com/assets/estimate-templates-gallery/816273056f7059918f7bde0d7f48c36a.jpg",
            "created_on": "2014-11-03T10:00:18Z",
            "updated_on": "2014-11-19T15:38:31Z"
        }
    ]
}
```

<a name="get"></a>
## Getting an estimate template

To get the estimate template info, make a GET request to:

* `/api/estimatetemplates/[TEMPLATE_ID]`

Example response:

```json
{
    "estimatetemplates": [
        {
            "id": 1230,
            "name": "English - Client on right",
            "is_default": false,
            "html": "<div class=\"estimate\">\r\n\t<div id=\"logo-img\" class=\"left\"></div>\r\n\t<div id=\"company-info\" class=\"right\">\r\n\t\t<div class=\"title\">Provider</div>\r\n\t\t{company_info}\r\n\t</div>\r\n\t<div class=\"right clear\">\r\n\t\t<div id=\"customer\" class=\"title\">\r\n\t\t\t<div>Customer</div>\r\n\t\t\t<!-- {CUSTOMER} ( DO NOT EDIT THIS LINE )-->\r\n\t\t</div>\r\n\t\t<div id=\"bill-to\">{bill_to}</div>\r\n\t</div>\r\n\t<div id=\"single-settings\" class=\"left\">\r\n\t\t<table>\r\n\t\t\t<thead>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th id=\"invoice-number-label\" class=\"label\">Estimate No.</th>\r\n\t\t\t\t\t<th id=\"invoice-number-value\" class=\"value\">{number}</th>\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr id=\"date-row\">\r\n\t\t\t\t\t<td id=\"date-label\" class=\"label\">Date</td>\r\n\t\t\t\t\t<td id=\"date-value\" class=\"value\">{date}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<div id=\"invoice-title\" class=\"clear\">{title}</div>\r\n\t<div id=\"items\">\r\n\t\t<table id=\"items-table\">\r\n\t\t\t<thead id=\"items-header\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<!-- {HEADER_ACF} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t\t<th class=\"item\">Item</th>\r\n\t\t\t\t\t<th class=\"description\">Description</th>\r\n\t\t\t\t\t<th class=\"price-unit\">Price/Unit</th>\r\n\t\t\t\t\t<th class=\"quantity\">Quantity</th>\r\n\t\t\t\t\t<th class=\"price\">Price</th>\r\n\t\t\t\t\t<!-- {HEADER_ACL} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody id=\"items-body\">\r\n\t\t\t\t<!-- {INVOICE_ROWS_START} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t<tr class=\"item-row\" id=\"{row_id}\">\r\n\t\t\t\t\t<!-- {ROW_ACF} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t\t\t<td class=\"item\" >{item}</td>\r\n\t\t\t\t\t<td class=\"description\">{description}</td>\r\n\t\t\t\t\t<td class=\"price-unit\">{price_unit}</td>\r\n\t\t\t\t\t<td class=\"quantity\">{quantity}</td>\r\n\t\t\t\t\t<td class=\"price\">{price}</td>\r\n\t\t\t\t\t<!-- {ROW_ACL} (DO NOT EDIT THIS LINE)-->\r\n\t\t\t\t</tr>\r\n\t\t\t\t<!-- {INVOICE_ROWS_END} ( DO NOT EDIT THIS LINE )-->\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n\t<div class=\"section\">\r\n\t\t<div id=\"totals\" class=\"right\">\r\n\t\t\t<table>\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<tr {check_subtotal_hide}>\r\n\t\t\t\t\t\t<td class=\"label\" id=\"subtotal-label\">Subtotal</td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"subtotal\">{subtotal}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr {check_tax_hide}>\r\n\t\t\t\t\t\t<td id=\"tax-value-label\" class=\"label\"><span id = \"tax-text\">{tax_text}</span><span id=\"tax-percent-value\">{tax}</span></td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"tax-value\">{tax_value}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr {check_tax2_hide}>\r\n\t\t\t\t\t\t<td id=\"tax2-value-label\" class=\"label\"><span id = \"tax2-text\">{tax2_text}</span><span id=\"tax-percent-value\">{tax2}</span></td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"tax2-value\">{tax2_value}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr class=\"highlighted\">\r\n\t\t\t\t\t\t<td id=\"total-label\" class=\"label\">Total</td>\r\n\t\t\t\t\t\t<td class=\"value right-align\" id=\"total\">{total}</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<!-- {BUTTONS_WRAPPER} ( DO NOT EDIT THIS LINE )-->\r\n\t</div>\r\n\t<div id=\"footer\" class=\"clear\">{footer}</div>\r\n\t<div id=\"invoice-brand\">Sent using <a href=\"http://www.paymoapp.com/?utm_source=invoice_footer&amp;utm_medium=inv&amp;utm_campaign=invoice_footer\" target=\"_blank\">paymoapp.com</a></div>\r\n</div>",
            "css": "",
            "created_on": "2014-11-19T09:45:32Z",
            "updated_on": "2014-11-19T09:45:32Z"
        }
    ]
}
```

<a name="create"></a>
## Creating an estimate template

To create an estimate template, make a POST request to:

* `/api/estimatetemplates`

with the request body containing the new template info. 

Sample request body to create a template with a custom estimate title color:

```json
{
	"name": "Template with custom title color",
	"is_default": false,
	"html": "<<use the html code of an estimate template from Paymo library>>",
	"css": "#estimate-title { color: #999; }"	
}
```

The `html` attribute contains an HTML template code with special placeholders for key estimate elements.
Placeholders look like `{PLACEHOLDER_NAME}` and will be replace with corresponding estimate property.
There are also blocks of HTML code with special meanings. These look like `<!-- {BLOCK_START} (DO NOT EDIT THIS LINE) -->`.

The `css` attribute contains _additional_ CSS rules to apply to estimate HTML template code. This is the field we recommend you use to customize how the estimate will look.

Because the estimate template is a complex structure, we recommend to use an existing `html` content and add any desired changes through the `css` field.

If successful, the response will return `201 Created`. The response header `Location` will contain a link for the new estimate template. The response body will contain the new estimate template info as in the **Getting an estimate template** section.

### Required fields

When creating an estimate template: `name`.
For a complete description of all estimate template fields, see [estimate template object](#object).

<a name="update"></a>
## Updating an estimate template

To update an existing estimate template, make a POST or PUT request to:

* `/api/estimatetemplates/[TEMPLATE_ID]`

with the request body containing the updated info. You can send only the changed fields.

Example of request body if you want to hide the footer from the estimate:

```json
{
	"css": "#footer { display: none; }"
}
```

### Changing the default estimate template

One of your estimate template is the default template used when creating a new estimate, of when displaying an estimate that has no template set.

You can change the default estimate template by making an update request for the new default template with the `is_default` attribute set to `true`. 

Example of request body:

```json
{
	"is_default": true
}
```

The old default estimate template will have the `is_default` set to `false`.

<a name="delete"></a>
## Deleting an estimate template

You can only delete an estimate template if there are no estimates using this template and the template is not the default one.

To delete an estimate template, make a DELETE request to:

* `/api/estimatetemplates/[TEMPLATE_ID]`

If successful, the response will have a `200 OK` status code.

<a name="object"></a>
## The estimate template object

An estimate template object has the following attributes:

Attribute|Type|Description
---------|----|-----------
id | integer | _(read-only)_ Unique template identifier
name | text | Template name
title | text | Default estimate title
html | text | HTML template code
css | text | Additional CSS code (basic CSS rules for estimates are already included by Paymo)
is_default | boolean | If `true`, this template is the default estimate template for your company
created_on | [datetime](datetime.md) | _(read-only)_ Date and time when the estimate template was created
updated_on | [datetime](datetime.md) | _(read-only)_ Date and time when the estimate template was last updated

<a name="dependencies"></a>
## Dependent objects

The following object types can be used in [includes](includes.md):

Object type|Include key|Relationship
-----------|-----------|----
[Estimate](estimates.md) | estimates | child
