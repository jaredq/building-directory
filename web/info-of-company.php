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
$result = mysql_query("select information from bldgdir_company where company_id="
        . $company_id . " and disabled=0 LIMIT 1", $db);

$text_response = "Company information is not found.";
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    $text_response = $row['information'];
}

echo $text_response;

//Close the database connection
mysql_close($db);
