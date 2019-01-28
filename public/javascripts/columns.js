function removeColumn() {
    fetch("http://localhost:3000/jenkins/column/" + event.srcElement.id, {
        method: "delete"
    })
    .then(res=>{console.log("Removing column... " + res)})
    location.reload(true)
}

function refreshColumns() {
    fetch("http://localhost:3000/jenkins/column/refresh", {
        method: "post"
    })
    .then(res=>{console.log("Refreshing columns... " + res)})
    location.reload(true)
}

function addInactiveColumnToList(column) {
    let ul = document.getElementById("customize-columns-ul")
    let li = document.createElement("li")
    li.appendChild(document.createTextNode(column))
    li.classList.add("mdl-menu__item")
    ul.appendChild(li)
}

var showJobInfo = function(jobName) {
    var infoTrElement = document.getElementById(jobName + "InfoTr")

    if (infoTrElement.style.display === "none") {
        infoTrElement.style.display = "block"
    } else {
        infoTrElement.style.display = "none"
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    (new Map(Object.entries(_actionColumns))).forEach(function(value, key) {
        applyAction(key, value)
    });

    _inactiveColumns.forEach(column => addInactiveColumnToList(column))
});