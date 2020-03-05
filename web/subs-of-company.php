<?php

include 'config.php';

header('Content-Type: text/html; charset=utf-8');

$company_id = filter_input(INPUT_GET, "coid", FILTER_VALIDATE_INT);

if (!$company_id) {
    echo "Company is not found.";
    exit();
}



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
$result = mysql_query("SELECT cosub_id, company_id, sort_number, logo_path, name, levels"
        . " FROM bldgdir_company_sub WHERE company_id="
        . $company_id . " order by sort_number asc, update_time desc", $db);

//Create an array
$json_response = array();

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {

    //push the values in the array
    array_push($json_response, $row);
}

echo json_encode($json_response);

//Close the database connection
mysql_close($db);
