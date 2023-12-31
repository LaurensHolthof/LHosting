let dropZone = document.getElementById('drop_zone');
let fileInput = document.getElementById('fileInput');
let ItemName = ["Item1", "Item2", "Test"];
let filenamesArray = [];

    // Create a new XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();

    // Set up the event handler for the request
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Parse the JSON response
            var filenames = JSON.parse(this.responseText);

            // Push each filename into the global array
            filenames.forEach(function(filename) {
                filenamesArray.push(filename);
            });
            DrawTable();
            // You can use 'filenamesArray' for further processing or logging
            console.log("Filenames Array:", filenamesArray);
        }
    };

    // Open and send the request to the server
    xmlhttp.open("GET", "get_filenames.php", true);
    xmlhttp.send();

window.onload = function() {
    //generate_array();
    
  };
  

dropZone.addEventListener('dragover', function (event) {
    event.preventDefault();
});

dropZone.addEventListener('drop', function (event) {
    event.preventDefault();
    let files = event.dataTransfer.files;
    uploadFile(files[0]);
});

dropZone.addEventListener('click', function () {
    fileInput.click();
});

fileInput.addEventListener('change', function () {
    uploadFile(fileInput.files[0]);
});

function uploadFile(file) {
    let url = './script.php';
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('file', file);
    xhr.open('POST', url, true);

    xhr.addEventListener('readystatechange', function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // File uploaded successfully
            alert('File uploaded!');
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            // Error occurred during upload
            alert('File upload failed!');
        }
    });

    xhr.send(formData);
}

function generate_array() {

    fetch('get_filenames.php')
        .then(response => response.json())
        .then(filenames => {
            // Push each filename into the array
            filenames.forEach(function(filename) {
                filenamesArray.push(filename);
            });

            // You can use 'filenamesArray' for further processing or logging
            console.log("Filenames Array:", filenamesArray);
        })
        .catch(error => console.error('Error:', error));

}

function DrawTable() {
    document.getElementById("FilesTable").innerHTML = Generate_table_html();
}

function Generate_table_html() {
    if(filenamesArray.length == 0) {
        return '<p style="margin-left: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 20px;" >There are no files</p>'
    }
    let table_html = "";
    for(let i = 0; i < filenamesArray.length; i++) {
        let row_html = "<tr>";
        for(let j = 0; j < 3; j++) {
            row_html += Generate_table_Cell(filenamesArray[i], j);
        }
        row_html += "</tr>";
        table_html += row_html;
    }
    return `<table id="MainTable">${table_html}</table>`;
}

function Generate_table_Cell(name, type) {
    let CellType = "";
    let Clickable = "";
    let text = "";
    if(type == 0) {
        CellType = "filename";
        Clickable = 'onclick="nameclick(this);"';
        text = `<a class="filelink" href="files/${name}">${name}</a>`;
    } else if(type == 1) {
        CellType = "download";
        text = `<a href="./files/${name}" download><img src="./assets/download.png" style="width: 30px; height: 30px; top:2px; position: relative;"></a>`;
    } else if(type == 2) {
        CellType = "delete";
        Clickable = 'onclick="Delete(this);"';
        text = "Delete";
    }
    return `<td class="board_square ${CellType}" ${Clickable}>${text}</td>`;
}

function Delete(cell) {
    let index = cell.parentNode.rowIndex;
    deleteFile(filenamesArray[index]);
    filenamesArray.splice(index, 1);
    DrawTable();
    return;
}

function deleteFile(filename) {
    fetch('delete_file.php?filename=' + encodeURIComponent(filename))
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => console.error('Error:', error));
}