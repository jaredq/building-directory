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

mysql_query("set character set 'utf8'", $db);

//Replace * in the query with the column names.
$result = mysql_query("select company_id, sort_number, name, small_logo_path, large_logo_path, lift_bank, levels"
        . ",phone, email, website from bldgdir_company where disabled=0 order by sort_number asc, update_time desc", $db);

//Create an array
$json_response = array();

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    
    //push the values in the array
    array_push($json_response, $row);
}

echo json_encode($json_response);

//Close the database connection
mysql_close($db);
