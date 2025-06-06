<?php
$target_dir = "./files/";

if (isset($_FILES["files"])) {
    $files = $_FILES["files"];

    for ($i = 0; $i < count($files['name']); $i++) {
        $originalFileName = $files["name"][$i];
        $fileExtension = pathinfo($originalFileName, PATHINFO_EXTENSION);

        if (strtolower($fileExtension) !== 'php' && strtolower($fileExtension) !== 'php3' && strtolower($fileExtension) !== 'php4' && strtolower($fileExtension) !== 'php5' && strtolower($fileExtension) !== 'php7' && strtolower($fileExtension) !== 'phtml' && strtolower($fileExtension) !== 'phps') {
            $target_file = $target_dir . basename($files["name"][$i]);
            if (move_uploaded_file($files["tmp_name"][$i], $target_file)) {
                echo "The file " . basename($files["name"][$i]) . " has been uploaded.\n";
            } else {
                echo "Sorry, there was an error uploading the file " . $files["name"][$i] . ".\n";
            }
        } else {
            echo "PHP files are not allowed.";
            return;
        }
    }
} else {
    echo "No files uploaded.";
}
?>
