# Date and time formats

Paymo API uses dates in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.

Examples:

* `2015-01-17` for representing a date (without time)
* `2015-01-17T18:23:02Z` for representing a date combined with time in UTC
* `2015-01-17T10:23:02-08:00` for representing a date combined with time in another timezone

For responses by Paymo API containing datetime values, the values will be in UTC.