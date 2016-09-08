(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Mefisto on 18.07.2016.
 */

let modules = require('./modulesES5');

// 1
let myLi = document.createElement('li');
myLi.classList.add('my-class');
myLi.innerText = ('Привет');

modules.prepend('.list', myLi);


// 2
// modules.deleteTextNodes('.list');

// 3
// modules.findNode('.list');

// 4
// modules.scanDOM();
},{"./modulesES5":2}],2:[function(require,module,exports){
'use strict';

/**
 * Created by Mefisto on 18.07.2016.
 */

// 1
function prepend(container, newElement) {
    var mycontainer = document.querySelector(container),
        secondEl = mycontainer.children[0];

    mycontainer.insertBefore(newElement, secondEl);
}

// 2
function deleteTextNodes(node) {
    var myNode = document.querySelector(node);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = myNode.childNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var el = _step.value;

            if (el.nodeType === 3) {
                el.remove();
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

// 3
function findNode(node) {
    var myNode = document.querySelector(node);

    deleteTextNodes(myNode);

    function deleteTextNodes(node) {
        var myNode = node;

        for (var i = 0; i < myNode.childNodes.length; i++) {
            if (myNode.childNodes[i].nodeType === 3) {
                myNode.childNodes[i].remove();
            }
        }

        for (var k = 0; k < myNode.children.length; k++) {
            if (myNode.children[k].childNodes.length > 1) {
                deleteTextNodes(myNode.children[k]);
            }
        }
    }
}

// 4
function scanDOM() {
    var node = arguments.length <= 0 || arguments[0] === undefined ? '*' : arguments[0];

    var elemAll = document.getElementsByTagName(node),
        myNode = document.querySelector(node);

    var className = {},
        tagName = {},
        textNodeCount = 0;

    tagClassCounter(elemAll);
    textNodeCounter(myNode);

    function tagClassCounter(elemAll) {

        for (var i = 0; i < elemAll.length; i++) {
            if (elemAll[i].getAttribute('class') != undefined) {
                if (className[elemAll[i].getAttribute('class')]) {
                    className[elemAll[i].getAttribute('class')]++;
                } else {
                    className[elemAll[i].getAttribute('class')] = 1;
                }
            }
            if (elemAll[i].tagName != undefined) {
                if (tagName[elemAll[i].tagName.toLocaleLowerCase()]) {
                    tagName[elemAll[i].tagName.toLocaleLowerCase()]++;
                } else {
                    tagName[elemAll[i].tagName.toLocaleLowerCase()] = 1;
                }
            }
        }
    }

    function textNodeCounter(myNode) {

        for (var i = 0; i < myNode.childNodes.length; i++) {
            if (myNode.childNodes[i].nodeType === 3) {
                textNodeCount++;
            }
        }

        for (var k = 0; k < myNode.children.length; k++) {
            if (myNode.children[k].childNodes.length > 1) {
                textNodeCounter(myNode.children[k]);
            }
        }
    }

    for (var elem in className) {
        console.log("Элементов с классом " + elem + ": " + className[elem]);
    }
    for (var _elem in tagName) {
        console.log("Тэгов " + _elem + ": " + tagName[_elem]);
    }
    console.log("Текстовых узлов: " + textNodeCount);
}

module.exports = {
    prepend: prepend,
    deleteTextNodes: deleteTextNodes,
    findNode: findNode,
    scanDOM: scanDOM
};
},{}]},{},[1]);
