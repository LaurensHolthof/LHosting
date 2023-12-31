<?php
$directory = './files/'; // Replace with the actual path to your directory
$filenames = array();

// Open a directory, and read its contents
if ($handle = opendir($directory)) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            $filenames[] = $file;
        }
    }
    closedir($handle);
}

// Send the array as a JSON response
header('Content-Type: application/json');
echo json_encode($filenames);
?>