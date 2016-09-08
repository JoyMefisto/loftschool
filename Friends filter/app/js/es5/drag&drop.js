"use strict";

// window.onload=function(){

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/plain");
    var myNode = document.getElementById(data);
    var myList = document.getElementById('friends__list');

    if (ev.target.tagName === "UL") {
        ev.target.appendChild(myNode);
    } else {
        searchUl(ev.target).appendChild(myNode);
    }

    function searchUl(elem) {
        if (elem.parentNode.tagName === "UL") {
            return elem.parentNode;
        } else {
            return searchUl(elem.parentNode);
        }
    }
}
// }