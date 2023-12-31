<?php
// Ensure that a filename parameter is provided
if (isset($_GET['filename'])) {
    $filename = $_GET['filename'];

    // Specify the directory path where the file is located
    $directory = './files/'; // Replace with the actual path

    // Construct the full path to the file
    $filepath = $directory . $filename;

    // Check if the file exists before attempting to delete
    if (file_exists($filepath)) {
        // Attempt to delete the file
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