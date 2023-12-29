<?php
$target_dir = "./files/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
  echo "The file ". basename($_FILES["file"]["name"]). " has been uploaded.";
} else {
  echo "Sorry, there was an error uploading your file.";
}
?>