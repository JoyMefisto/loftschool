// consoleRec(array[, first index]);
function consoleRec(arr, num) {
	var lengthRec = arr.length - 1;
	var length = (typeof num === 'number') ? num : 0;

	console.log(arr[length]);
	return length !== lengthRec ? consoleRec(arr, length + 1) : false;
}

module.exports = consoleRec;