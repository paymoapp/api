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

// List project names
foreach( json_decode($result, true)['projects'] as $project ) {
    echo $project['name'] . "\n";
}
