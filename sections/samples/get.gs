function sampleGetRequest() {
  const email = 'johndoe@email.com';
  const password = 'secret';

  var headers = {
    "Authorization": "Basic " + Utilities.base64Encode(email + ":" + password),
    "Accept": "application/json"
  };

  var params = {
    "method": "GET",
    "headers": headers
  };

  var url = "https://app.paymoapp.com/api/projects";
  var response = UrlFetchApp.fetch(url, params);

  Logger.log("response code: " + response.getResponseCode());

  var responseJson = JSON.parse(response.getContentText());

  Logger.log(responseJson.projects.length + " projects");

  responseJson.projects.forEach(function (project) {
    Logger.log(project.name);
  });
}
