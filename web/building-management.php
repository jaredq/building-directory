<?php

include 'config.php';

//Create Database connection
//$db = mysql_connect();
$db = mysql_connect($config['db_server'], $config['db_username'], $config['db_password']);
if (!$db) {
    die('Could not connect to db: ' . mysql_error());
}

//Select the Database
//mysql_select_db("520_demo_st", $db);
mysql_select_db($config['db_database'], $db);

//Replace * in the query with the column names.
$result = mysql_query("select * from bldgdir_management where management_id=1 LIMIT 1", $db);

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $json_response['management_id'] = $row['management_id'];
    $json_response['name'] = $row['name'];
    $json_response['location'] = $row['location'];
    $json_response['phone'] = $row['phone'];
    $json_response['email'] = $row['email'];
    $json_response['website'] = $row['website'];
    $json_response['logo_path'] = $row['logo_path'];
    $json_response['about_us'] = $row['about_us'];
    $json_response['contact_us'] = $row['contact_us'];
    $json_response['update_time'] = $row['update_time'];
    //$row_array['admin_username'] = $row['admin_username'];
    //$row_array['admin_password'] = $row['admin_password'];
}

echo json_encode($json_response);

//Close the database connection
mysql_close($db);
