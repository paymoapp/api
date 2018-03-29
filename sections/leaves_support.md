# Leaves Support

## Get user annual leave info

Make sure you've set up the annual leave entitlement for company (POST request to `/api/company/[COMPANY_ID]`) or for an user (POST request to `/api/users/[USER_ID]`) with the body:

```json
{
	"annual_leave_days_number":21
}
```

Get the user annual leave info by making a POST request to `/api/statsreports` with the body:

```json
{
	"params":{
		"user_id":76509,
        "date_interval":"this_year"
	},
	"type": "user_annual_leave_stats"
}
```

Example of response:

```json
{
	"statsreports":[
		{
			"info": {
				"type":"user_annual_leave_stats",
				"params": {
					"user_id":76509,
					"date_interval":"this_year"
				}
			},
			"content":[
				{
					"user_annual_leave_stats": {
						"annual_leave_days_number":21,
						"unpaid_leave_days_count":3,
						"used_leave_days_count":5
					}
				}
			]
		}
	]
}
```

Available options for date interval are 'this_year' and 'last_year'.

## Get working days count

You can find the number of the working days for a user in a interval of time by making a POST request to `/api/statsreports` with the body:

```json
{
	"params":{
		user_id: 76509,
		start_date: "2017-05-06T00:00:00",
		end_date: "2017-07-30T00:00:00"
	},
	"type": "user_working_days_count"
}
```

Example of response:

```json
{
	"statsreports":[
		{
			"info": {
				"type":"user_working_days_count",
				"params": {
					"user_id":76509,
					"start_date":"2017-07-06T00:00:00",
					"end_date":"2017-07-30T00:00:00"
				}
			},
			"content":[
				{
					"working_days_count":17
				}
			]
		}
	]
}