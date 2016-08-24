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

echo "New project ID: " . json_decode($result, true)['projects'][0]['id'];
