(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// consoleRec(array[, first index]);
function consoleRec(arr, num) {
	var lengthRec = arr.length - 1;
	var num = (typeof num === 'number') ? num : 0;


    if(lengthRec >= num && num >= 0){
        console.log(arr[num]);
        return num !== lengthRec ? consoleRec(arr, num + 1) : false;
    } else {
        throw new Error('Заданное число больше длины массива');
    }
}

module.exports = consoleRec;
},{}],2:[function(require,module,exports){
var consoleRec = require('./es6');

let arrRec = ['я', 'умею', 'писать', 'рекурсивные', 'функции'],
    zero = 0;

// consoleRec(array[, first index]);
consoleRec(['1','2'],1);
},{"./es6":1}]},{},[2]);
