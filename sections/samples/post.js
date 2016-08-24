const request = require('request');
const email = 'johndoe@email.com';
const password = 'secret';

var postData = {
    client_id: 123456,
    name: 'New Project',
    description: 'Project added from API'
};

request.post(
    {
        url: 'https://app.paymoapp.com/api/projects',
        body: JSON.stringify(postData),
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        auth: {
            user: email,
            pass: password
        }
    },
    function (error, response, body) {
        if (!error) {
            console.log('New project ID: ' + JSON.parse(body).projects[0].id);
        } else {
            console.log(error);
        }
    }
);
