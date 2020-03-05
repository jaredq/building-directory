<?php

include 'config.php';
include 'ModuleCode.php';

$json_response['module_code'] = moduleCode::ADM_QUERY_CO;

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
$result = mysql_query("select * from bldgdir_company where company_id="
        . $company_id . " and disabled=0 LIMIT 1 ", $db);

$json_response['company_id'] = $company_id;
$json_response['information'] = "Company information is not found.";

while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $json_response['company_id'] = $row['company_id'];
    $json_response['sort_number'] = $row['sort_number'];
    $json_response['name'] = $row['name'];
    $json_response['small_logo_path'] = $row['small_logo_path'];
    $json_response['large_logo_path'] = $row['large_logo_path'];
    $json_response['lift_bank'] = $row['lift_bank'];
    $json_response['phone'] = $row['phone'];
    $json_response['email'] = $row['email'];
    $json_response['levels'] = $row['levels'];
    $json_response['website'] = $row['website'];
    $json_response['information'] = $row['information'];
    $json_response['update_time'] = $row['update_time'];
    $json_response['disabled'] = $row['disabled'];
}

echo json_encode($json_response);

//Close the database connection
mysql_close($db);
