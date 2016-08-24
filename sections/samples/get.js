const request = require('request');
const email = 'johndoe@email.com';
const password = 'secret';

request.get(
    'https://app.paymoapp.com/api/projects',
    {
        auth: {
            user: email,
            pass: password
        },
        headers: {
            'Accept': 'application/json'
        }
    },
    function (error, response, body) {
        if (!error) {
            // List project names
            JSON.parse(body).projects.forEach(function (project) {
                console.log(project.name);
            });
        } else {
            console.log(error);
        }
    }
);