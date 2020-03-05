<?php

include 'config.php';
include 'ModuleCode.php';

$json_response['module_code'] = moduleCode::ADM_LOGIN;

$json_response['result_code'] = "900";
$json_response['result_message'] = "Unkown";

// Start the session
session_start();

// The request is a JSON request.
// We must read the input.
// $_POST or $_GET will not work!
$data = file_get_contents("php://input");
$objData = json_decode($data);

$username = $objData->login_username;
$password = $objData->login_password;

if (!$username || !$password) {
    $json_response['result_code'] = "100";
    $json_response['result_message'] = "Username or Password is empty";
    echo json_encode($json_response);
    exit();
}

//Create Database connection
$mysqli = new mysqli($config['db_server'], $config['db_username'], $config['db_password'], $config['db_database']);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$mysqli->query("set character set 'utf8'");

/* Prepared statement, stage 1: prepare */
if (!($stmt = $mysqli->prepare("SELECT admin_username FROM bldgdir_management WHERE admin_username=? and admin_password=?"))) {
    echo "Prepare statement failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->bind_param("ss", $username, $password)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}

$stmt->bind_result($un);
$stmt->fetch();

if ($un) {
    $_SESSION['username'] = $un;
            
    $json_response['username'] = $un;
    
    $json_response['result_code'] = "0";
    $json_response['result_message'] = "Success";
} else {
    $json_response['result_code'] = "200";
    $json_response['result_message'] = "Username or password is wrong";
}
/* explicit close recommended */
$stmt->close();

/* close connection */
$mysqli->close();

echo json_encode($json_response);
