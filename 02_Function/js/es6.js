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