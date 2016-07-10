'use strict';

// consoleRec(array[, first index]);
function consoleRec(arr, num) {
    var lengthRec = arr.length - 1;
    var length = typeof num === 'number' ? num : 0;

    if (arr.length - 1 >= length && length >= 0) {
        console.log(arr[length]);
        return length !== lengthRec ? consoleRec(arr, length + 1) : false;
    } else {
        return console.log('Заданное число больше длины массива');
    }
}

module.exports = consoleRec;