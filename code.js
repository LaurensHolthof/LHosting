let dropZone = document.getElementById('drop_zone');
let fileInput = document.getElementById('fileInput');

window.onload = function() {
    DrawTable();
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

function DrawTable() {
    document.getElementById("FilesTable").innerHTML = Generate_table_html();
}

function Generate_table_html() {
    let table_html = "";
    for(let i = 0; i < 3; i++) {
        let row_html = "<tr>";
        for(let j = 0; j < 2; j++) {
            row_html += Generate_table_Cell(j);
        }
        row_html += "</tr>";
        table_html += row_html;
    }
    return `<table id="MainTable">${table_html}</table>`;
}

function Generate_table_Cell(type) {
    let CellType = "";
    let Clickable = "";
    let text = "";
    if(type == 0) {
        CellType = "filename";
        Clickable = 'onclick="nameclick(this);"';
        text = "Filename";
    } else if(type == 1) {
        CellType = "delete";
        Clickable = 'onclick="delete(this);"';
        text = "Delete";
    }
    return `<td class="board_square ${CellType}" ${Clickable}>${text}</td>`;
}