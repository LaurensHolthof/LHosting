<?php
if (isset($_GET['filename'])) {
    $filename = $_GET['filename'];
    $directory = './files/';
    $filepath = $directory . $filename;

    if (file_exists($filepath)) {
        if (unlink($filepath)) {
            echo "File $filename deleted successfully.";
        } else {
            echo "Error deleting file $filename.";
        }
    } else {
        echo "File $filename does not exist.";
    }
} else {
    echo "Filename parameter is missing.";
}
?>