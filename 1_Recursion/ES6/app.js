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

let arrRec = ['я', 'умею', 'писать', 'рекурсивные', 'функции'],
	lengthRec = arrRec.length-1,
	zero = 0;

consoleRec(arrRec, zero);

function consoleRec(arr, num) {
	var arr = arr;
	var length = num;

	console.log(arr[length]);
	return (length !== lengthRec) ? consoleRec(arr, length + 1) : false;
}
