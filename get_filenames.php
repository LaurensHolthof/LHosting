<?php
$directory = './files/';
$filenames = array();

if ($handle = opendir($directory)) {
    while (false !== ($file = readdir($handle))) {
        if ($file != "." && $file != "..") {
            $filenames[] = $file;
        }
    }
    closedir($handle);
}

header('Content-Type: application/json');
echo json_encode($filenames);
?>