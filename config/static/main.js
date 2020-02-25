"use strict";

var configFile;
function submitUpdate(event) {
    event.preventDefault();
    // let elements = document.getElementById("id_config_form").elements;
    var elements = document.getElementById("id_config_form").children;
    // let elements = document.querySelectorAll("#config-form input")
    var content = {};
    for (var index = 0; index < elements.length; index++) {
        var blockName = elements[index].id.split("_").slice(1).join("_");
        if (blockName == "") {
            continue;
        }
        content[blockName] = {}
        var inputs = elements[index].querySelectorAll("input")
        for (var i = 0; i < inputs.length; i++) {
            switch (inputs[i].type) {
                case "checkbox":
                    content[blockName][inputs[i].name] = inputs[i].checked;
                    break;
                case "text":
                    content[blockName][inputs[i].name] = inputs[i].value;
                    break;
                case "number":
                    content[blockName][inputs[i].name] = Number(inputs[i].value);
                    break;
                case "password":
                    content[blockName][inputs[i].name] = inputs[i].value;
                    break;
            }
        }

    }
    if (configFile == null) {
        var filename = "CONFIG.TXT"
    } else {
        var filename = configFile[0].name;
    }
    var blob = new Blob([JSON.stringify(content,null,2)], {
        type: "text/plain;charset=utf-8"
    });
    // saveAs(blob, filename)
    fileDownload(filename, JSON.stringify(content,null,2))
}

function fileDownload(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function handleFileSelectDrag(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    configFile = evt.dataTransfer.files; // FileList object.
    readSingleFile(evt);
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = configFile[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
function handleFileSelectButton(evt) {
    evt.preventDefault();
    configFile = evt.target.files; // FileList object
    readSingleFile(evt);
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = configFile[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
            f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function clearFileName(evt){
    evt.target.value = null;
}

function readSingleFile(evt) {
    try{
        var file = evt.target.files[0];
    } catch (TypeError){
        var file = evt.dataTransfer.files[0];
    }
    if (!file) {
        alert("No file selected")
        return;
    }
    var reader = new FileReader();
    reader.onload = function (evt) {
        var contents = evt.target.result;
        try{
            var configJson = JSON.parse(contents);
        } catch(SyntaxError){
            alert("File is cropped. Error: " + SyntaxError.message)
            return
        }
        var elements = document.getElementById("id_config_form").children;
        for (var block in configJson) {
            console.log("block name:"+block);
            var blockElement = document.getElementById("id_" + block);
            for (var inputName in configJson[block]) {
                console.log("item name:" + inputName);
                var inputElement = blockElement.querySelector(`input[name='${inputName}'`);
                switch (inputElement.type) {
                    case "checkbox":
                        inputElement.checked = configJson[block][inputName];
                        break;
                    case "text":
                        inputElement.value = configJson[block][inputName];
                        break;
                    case "number":
                        inputElement.value = Number(configJson[block][inputName]);
                        break;
                    case "password":
                        inputElement.value = configJson[block][inputName];
                        break;
                }
            }
            console.log("---------------------------------")

        }
    };
    reader.readAsText(file);
}