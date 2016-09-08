// window.onload=function(){
    
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text/plain");
    let myNode = document.getElementById(data);
    let myList = document.getElementById('friends__list');

    if (ev.target.tagName === "UL") {
        ev.target.appendChild(myNode);
    } else {
        searchUl(ev.target).appendChild(myNode);
    }

    function searchUl(elem){
        if(elem.parentNode.tagName === "UL") {
            return elem.parentNode;
        } else {
            return searchUl(elem.parentNode);
        }
    }
}
// }
