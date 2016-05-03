# Code Examples

## PHP

### GET request

```php
<?php
$target_url = "https://app.paymoapp.com/api/projects";
$email = "johndoe@email.com";
$password = "secret";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
curl_setopt($ch, CURLOPT_USERPWD, $email . ":" . $password);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($ch);
if ($result === false) {
	echo "Curl error: " . curl_error($ch) . "\n";
}
curl_close($ch);
echo $result;

```

### POST request


```php
<?php
$target_url = "https://app.paymoapp.com/api/projects";
$email = "johndoe@email.com";
$password = "secret";

$post = array(
	"client_id" => 123456,
	"name" => "New Project",
	"description" => "Project added from API"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
curl_setopt($ch, CURLOPT_USERPWD, $email . ":" . $password);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($ch);
if ($result === false) {
	echo "Curl error: " . curl_error($ch) . "\n";
}
curl_close($ch);
echo $result;

```

### File upload 

```php
<?php

$target_url = "https://app.paymoapp.com/api/files";
$email = "johndoe@email.com";
$password = "secret";

$file_name_with_full_path = "/path/to/file.jpg";
$post = array(
	"project_id" => "123456",
	"file" => "@" . $file_name_with_full_path
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Accept: application/json"));
curl_setopt($ch, CURLOPT_USERPWD, $email . ":" . $password);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_SAFE_UPLOAD, 0);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);

if ($result === false) {
	echo "Curl error: " . curl_error($ch) . "\n";
}

curl_close($ch);
echo $result;

```
