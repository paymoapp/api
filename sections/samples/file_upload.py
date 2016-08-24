import requests

email = 'johndoe@email.com'
password = 'secret'

payload = {'project_id': 123456}
headers = {'Accept': 'application/json'}
r = requests.post('https://app.paymoapp.com/api/files',
    data=payload,
    files={'file': open('/Users/ldim/Pictures/interiors/zooco-estudio-etoday-06.jpg', 'rb')},
    headers=headers,
    auth=(email, password))

print 'New File URL: %s' % r.json()['files'][0]['file']
