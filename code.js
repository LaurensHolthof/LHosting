let dropZone = document.getElementById('drop_zone');
let fileInput = document.getElementById('fileInput');
let progressContainer = document.getElementById('progress-container');
let progressBar = document.getElementById('progress-bar');
let filenamesArray = [];

function GenerateArray() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var filenames = JSON.parse(this.responseText);
            filenames.forEach(function (filename) {
                filenamesArray.push(filename);
            });
            DrawTable();
        }
    };

    xmlhttp.open("GET", "get_filenames.php", true);
    xmlhttp.send();
}

GenerateArray();

dropZone.addEventListener('dragover', function (event) {
    event.preventDefault();
});

dropZone.addEventListener('drop', function (event) {
    event.preventDefault();
    let files = event.dataTransfer.files;
    uploadFiles(files);
});

// Create a new file input element on each click to allow multiple selection
dropZone.addEventListener('click', function () {
    createFileInput();
});

function createFileInput() {
    if (fileInput) {
        fileInput.parentNode.removeChild(fileInput);
    }

    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = 'multiple';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', function () {
        uploadFiles(fileInput.files);
    });

    document.body.appendChild(fileInput);

    fileInput.click();
}

function uploadFiles(files) {
    let url = './script.php';
    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
    }

    xhr.open('POST', url, true);

    // Track the upload progress
    xhr.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            let percentage = (e.loaded / e.total) * 100;
            progressBar.style.width = percentage + '%';
        }
    });

    // Handle the completion of the upload
    xhr.addEventListener('load', function () {
        if (xhr.status == 200) {
            alert('Files uploaded!');
        } else {
            alert('File upload failed!');
        }

        // Reset the progress bar
        progressBar.style.width = '0';
        progressContainer.style.display = 'none';
    });

    // Handle errors
    xhr.addEventListener('error', function () {
        alert('File upload failed!');
        progressBar.style.width = '0';
        progressContainer.style.display = 'none';
    });

    // Show the progress bar
    progressContainer.style.display = 'block';

    xhr.send(formData);
}

// Initial file input creation
fileInput = null;
createFileInput();



function DrawTable() {
    document.getElementById("FilesTable").innerHTML = Generate_table_html();
}

function Generate_table_html() {
    if (filenamesArray.length == 0) {
        return '<p style="margin-left: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 20px;" >There are no files</p>'
    }
    let table_html = "";
    for (let i = 0; i < filenamesArray.length; i++) {
        let row_html = "<tr>";
        for (let j = 0; j < 3; j++) {
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
    if (type == 0) {
        CellType = "filename";
        Clickable = 'onclick="nameclick(this);"';
        text = `<a class="filelink" href="files/${name}">${name}</a>`;
    } else if (type == 1) {
        CellType = "download";
        text = `<a href="./files/${name}" download><img title="Download" src="./assets/download.png" style="width: 30px; height: 30px; top:3px; position: relative;"></a>`;
    } else if (type == 2) {
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

function refresh() {
    filenamesArray = [];
    GenerateArray();

    const refreshButton = document.getElementById('refreshbutton');
    refreshButton.classList.add('rotated');
  
    // Remove the class after the animation completes
    refreshButton.addEventListener('transitionend', () => {
      refreshButton.classList.remove('rotated');
    }, { once: true });
}
