var actions = ["RENDER_IMAGE", "LINK", "DEFAULT"]
var SERVER_URL = "http://localhost:3000"

var applyAction = function(column, action) {
    let _action = action || "DEFAULT"
    let cells = document.getElementsByClassName(column)
    if (_action === "LINK") {
        Array.from(cells).forEach( cell => createLink(cell) )
    }
    if (_action === "RENDER_IMAGE") {
        Array.from(cells).forEach( cell => renderImage(cell) )
    }
}

var createLink = function(cell) {
    a = document.createElement('a');
    a.href = cell.innerHTML
    a.innerHTML = cell.innerHTML
    appendToCell(cell, a)
}

var renderImage = function(cell) {
    let img = document.createElement('img')
    img.src = SERVER_URL + "/images/" + cell.innerHTML + ".png"
    appendToCell(cell, img)
}

var appendToCell = function(cell, children) {
    cell.innerHTML = ""
    cell.appendChild(children)
}