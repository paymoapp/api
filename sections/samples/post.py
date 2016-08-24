import requests

email = 'johndoe@email.com'
password = 'secret'

payload = {
    'client_id': 123456,
    'name': 'New Project',
    'description': 'Project added from API'
}
headers = {'Accept': 'application/json'}
r = requests.post('https://app.paymoapp.com/api/projects', data=payload, headers=headers, auth=(email, password))

print 'New Project ID: %s' % r.json()['projects'][0]['id']
