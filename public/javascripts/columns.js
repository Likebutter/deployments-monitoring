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

function activateColumn(event) {
    column = event.target.innerHTML
    fetch("http://localhost:3000/jenkins/column/activate", {
        method: "post",
        body: `column=${column}`
    })
    .then(res=>{console.log(`Activating column ${column}...  ${res}`)})
    location.reload(true)
}

function addInactiveColumnToList(col) {
    let ul = document.getElementById("customize-columns-ul")
    let li = document.createElement("li")
    li.appendChild(document.createTextNode(col))
    li.classList.add("mdl-menu__item")
    li.addEventListener("click", function(event) { activateColumn(event) });
    ul.appendChild(li)
}

var showJobInfo = function(jobName) {
    var infoTrElement = document.getElementById(jobName + "InfoTr")

    if (infoTrElement.style.display === "none") {
        infoTrElement.style.display = "table-row"
    } else {
        infoTrElement.style.display = "none"
    }
}

window.onload = function() {
    (new Map(Object.entries(_actionColumns))).forEach(function(value, key) {
        applyAction(key, value)
    });

    _inactiveColumns.forEach(col => addInactiveColumnToList(col))
};