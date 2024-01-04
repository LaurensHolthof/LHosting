<?php
$target_dir = "./files/";

// Check if the "files" key exists in the $_FILES array
if (isset($_FILES["files"])) {
    $files = $_FILES["files"];

    // Loop through each file
    for ($i = 0; $i < count($files['name']); $i++) {
        $target_file = $target_dir . basename($files["name"][$i]);

        if (move_uploaded_file($files["tmp_name"][$i], $target_file)) {
            echo "The file " . basename($files["name"][$i]) . " has been uploaded.\n";
        } else {
            echo "Sorry, there was an error uploading your file " . $files["name"][$i] . ".\n";
        }
    }
} else {
    echo "No files uploaded.\n";
}
?>