# Leaves Support

There are three endpoints to consider when you want to find working/non-working days in a specific interval of time.

For company, get from the [company info](company.md) "working_days" and verify if contains the numeric representation of the day of the week (ISO-8601) for every date from the interval.
Then, make a GET request to `/api/companiesdaysexceptions?where=date<=interval.end_date&&end_date>=interval.start_date` (see [Company Days Exceptions](companies_days_exceptions.md)) and exclude or include the intervals depending on the field "is_working".

For a user, you need to make a GET request to `/api/usersdaysexceptions?where=user_id=[USER_ID]&&date<=interval.end_date&&end_date>=interval.start_date` (see [Users Days Exceptions](users_days_exceptions.md)) and exclude or include the intervals from those of the company.

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
					"user_id":8,
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