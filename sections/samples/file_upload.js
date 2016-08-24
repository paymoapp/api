const request = require('request');
const fs = require('fs');
const email = 'johndoe@email.com';
const password = 'secret';

var formData = {
    project_id: 123456,
    file: fs.createReadStream('/path/to/file.jpg')
};

request.post(
    {
        url: 'https://app.paymoapp.com/api/files',
        formData: formData,
        headers: {
            'Accept': 'application/json'
        },
        auth: {
            user: email,
            pass: password
        }
    },
    function (error, response, body) {
        if (!error) {
            console.log('New file URL: ' + JSON.parse(body).files[0].file);
        } else {
            console.log(error);
        }
    }
);
