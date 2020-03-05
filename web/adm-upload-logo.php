<?php

include 'ModuleCode.php';

$json_response['module_code'] = moduleCode::ADM_UPLOAD_LOGO;

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

if (isset($_FILES['logoFile'])) {
    $image = $_FILES['logoFile'];
    $file_name = $image['name'];
    $file_size = $image['size'];
    $file_tmp = $image['tmp_name'];
    $file_type = $image['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg", "jpg", "png");
    if (in_array($file_ext, $extensions) === false) {
        $json_response['result_code'] = "100";
        $json_response['result_message'] = "Image should be a JPEG or PNG file.";
    }
    if ($file_size > 2097152) {
        $json_response['result_code'] = "101";
        $json_response['result_message'] = 'File size cannot exceed 2 MB';
    }
    
    if ($json_response['result_code'] == "900") {
        $date = date('YmdHis') . rand(1000, 9999);

        $path_uploaded = 'upload/' . $date . '/';
        $file_uploaded = $path_uploaded . $file_name;

        if (mkdir($path_uploaded)) {
            if (move_uploaded_file($file_tmp, $file_uploaded)) {
                $json_response['result_code'] = "0";
                $json_response['result_message'] = "Success";
                $json_response['file_uploaded'] = $file_uploaded;
            } else {
                $json_response['result_code'] = "102";
                $json_response['result_message'] = 'Failed to save file';
            }
        } else {
            $json_response['result_code'] = "103";
            $json_response['result_message'] = 'Failed to create directory: ' . $path_uploaded;
        }
    }
}

echo json_encode($json_response);
