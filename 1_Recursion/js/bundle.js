(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// Напишите модуль, который экспортирует функцию с именем `consoleRec`.
// Функция должна **рекурсивно** выводить элементы массива на экран.
// Запрещено использовать циклы и методы для работы с массивами.
// Функция должна принимать два аргумента: массив и… что-то еще.
//Что именно - остается на ваше усмотрение. Пример вызова:

// consoleRec(['я', 'умею', 'писать', 'рекурсивные', 'функции'], ???);
// должна вывести на экран:
// я
// умею
// писать
// рекурсивные
// функции

function consoleRec(arr, num) {
	var lengthRec = arr.length - 1;
	var arr = arr;
	var length = num;

	console.log(arr[length]);
	return length !== lengthRec ? consoleRec(arr, length + 1) : false;
}

module.exports = consoleRec;
},{}],2:[function(require,module,exports){
var consoleRec = require('./es5');

let arrRec = ['я', 'умею', 'писать', 'рекурсивные', 'функции'],
    zero = 0;

consoleRec(arrRec, zero);
},{"./es5":1}]},{},[2]);
