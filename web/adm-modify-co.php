<?php

include 'config.php';
include 'ModuleCode.php';

$json_response['module_code'] = moduleCode::ADM_MODIFY_CO;

$json_response['result_code'] = "900";
$json_response['result_message'] = "Unkown";

// Start the session
session_start();

if (!isset($_SESSION['username'])) {
    $json_response['result_code'] = "700";
    $json_response['result_message'] = "Idle for too long, need to sign in again";
    echo json_encode($json_response);
    exit();
}

// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!
$data = file_get_contents("php://input");
$objData = json_decode($data);

//Create Database connection
$mysqli = new mysqli($config['db_server'], $config['db_username'], $config['db_password'], $config['db_database']);
if ($mysqli->connect_errno) {
    $json_response['result_code'] = "800";
    $json_response['result_message'] = "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
    
    $mysqli->close();
    echo json_encode($json_response);
    exit();
}

$mysqli->query("set character set 'utf8'");

/* Prepared statement, stage 1: prepare */
if (!($stmt = $mysqli->prepare("UPDATE `bldgdir_company` SET "
        . " `sort_number`=?,`name`=?,`small_logo_path`=?,`large_logo_path`=?,"
        . " `lift_bank`=?,`phone`=?,`email`=?,`levels`=?,`website`=?,"
        . " `information`=?,`update_time`=CURRENT_TIMESTAMP,`disabled`=0"
        . " WHERE `company_id`=?"))) {
    echo "Prepare statement failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->bind_param("isssssssssi", $objData->sort_number, $objData->name, $objData->small_logo_path, $objData->large_logo_path, $objData->lift_bank, $objData->phone, $objData->email, $objData->levels, $objData->website, $objData->information, $objData->company_id)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

if ($stmt->affected_rows > 0) {
    $json_response['result_code'] = "0";
    $json_response['result_message'] = "Success";
} else {
    $json_response['result_code'] = "200";
    $json_response['result_message'] = "No company was modified";
}

/* explicit close recommended */
$stmt->close();

/* close connection */
$mysqli->close();

echo json_encode($json_response);
