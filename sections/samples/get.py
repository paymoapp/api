import requests

email = 'johndoe@email.com'
password = 'secret'

headers = {'Accept': 'application/json'}
r = requests.get('https://app.paymoapp.com/api/projects', headers=headers, auth=(email, password))

# List project names
for project in r.json()['projects']:
    print project['name']
