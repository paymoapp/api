function samplePostRequest() {
  const email = 'johndoe@email.com';
  const password = 'secret';

  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(email + ":" + password),
    "Accept": "application/json",
    "Content-type": "application/json"
  };

  var postData = {
    client_id: 123456,
    name: 'New Project',
    description: 'Project added from API'
  };

  var params = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };

  var url = "https://app.paymoapp.com/api/projects";
  var response = UrlFetchApp.fetch(url, params);

  Logger.log("response code: " + response.getResponseCode());

  var responseJson = JSON.parse(response.getContentText());
  Logger.log("New Project ID: " + responseJson.projects[0].id);
}
