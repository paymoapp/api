#Paymo 3 API Authentication

##Basic Auth

For a quick start using the Paymo 3 API, you can use HTTP Basic authentication with your email and password info:

```shell
curl -u email:password 
  -H 'Accept: application/json' 
  https://app.paymoapp.com/api/clients
```

Most HTTP client applications support HTTP Basic authentication out of the box.

<a name="api-keys"></a>
##API Keys

When using Paymo 3 API with a third-party software, we recommend you using API Keys instead of asking for user's email/password. 

API Keys can be generated from the Paymo application, on the [My Account](https://app.paymoapp.com/#Paymo.module.myaccount/) page. 

Using an API Key is similar to Basic Auth, but instead of providing the email/password, you provide the API Key as the username and any text for the password. 

For example:

```shell
curl -u apikey:X 
  -H 'Accept: application/json'
  https://app.paymoapp.com/api/me
```

<a name="sessions"></a>
##Using Sessions

Another way to authenticate the API requests are by using session tokens. This token is sent by an HTTP header named `X-Session`

```shell
curl -H 'X-Session: abcdef01234567890' 
  -H 'Accept: application/json' 
  https://app.paymoapp.com/api/clients 
```

Anyone using the session token has the same access level as the user for whom the session token was created.

###Creating session tokens

Session tokens are creating by making a POST request to 

* `https://app.paymoapp.com/api/sessions`

When making this request, you have to use HTTP Basic authentication or an API Key.

Sample request:

```shell
curl -u email:password 
  -H 'Accept: application/json' 
  https://app.paymoapp.com/api/sessions
```

Sample response:
```json
{
    "sessions": [
        {
            "id": "9762c607ec2b5d9e13c423cbafeb7ec8",
            "ip": "10.0.2.2",
            "expires_on": "2015-02-16T13:54:41Z",
            "created_on": "2015-01-16T13:54:41Z",
            "updated_on": "2015-01-16T13:54:41Z",
            "user_id": 1234
        }
    ]
}
```

A session token has an expiration date, after which it will be no longer valid.

###Ending a session

When you want to end a session and make its token invalid, make a DELETE request to:
 
* `https://app.paymoapp.com/api/sessions/[SessionID]`

