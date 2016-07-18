/**
 * Created by Mefisto on 12.07.2016.
 */

'use strict';
let array = [1, 2, 3, 4, 5, 6];
console.log('START forEach');
// forEach
function forEach(arr, callbackFunc, thisArg){
    let i;
    for(i = 0; i < arr.length; i++){
        callbackFunc.call(thisArg, arr[i], i ,arr);
    }
}
forEach(array,function(item,i,arr){
    console.log("Значение: " + item + " Индекс: " + item + " массив: [" + arr + "]");
});
console.log('END forEach');

console.log('START map');
// map
function map(arr, callbackFunc, thisArg){
    let i, array = [];
    for(i = 0; i < arr.length; i++){
        array[array.length] = callbackFunc.call(thisArg, arr[i], i ,arr);
    }
    return array;
}
let newMap = map(array,function(item,i,arr){
    return item*item;
});
console.log(newMap);
console.log('END forEach');


console.log('START filter');
// filter
function filter(arr, callbackFunc, thisArg){
    let i, array = [];
    for(i = 0; i < arr.length; i++){

        if(callbackFunc.call(thisArg, arr[i], i ,arr)){
            array[array.length] = arr[i];
        }

    }
    return array;
}

let newFilter = filter(array,function(item,i,arr){
    return item > 3;
});
console.log(newFilter);
console.log('END forEach');


console.log('START reduce');
// reduce
function reduce(arr, callbackFunc, firstValue){
    let i, result = firstValue;

    for(i = 0; i < arr.length; i++){
        result = callbackFunc.call(null, result, arr[i], i ,arr);
    }

    return result;
}

let newReduce = reduce(array, function(result, item, i, arr){
    return result + item;
},0);
console.log(newReduce);
console.log('END forEach');


console.log('START slice');
// slice
function slice([... arr], start, end){
    let
        array = arr,
        lengthArr = array.length,
        pointStart = start || 0,
        pointEnd = end || lengthArr,
        result = [];

    if(start < 0) pointStart = lengthArr + pointStart;
    if(pointEnd > lengthArr) pointEnd = lengthArr;

    for(pointStart; pointStart < pointEnd; pointStart++){
        result[result.length] = array[pointStart];
    }

    return result;
}

let newSlice = slice(array, 1,4);
console.log(newSlice);
console.log('END forEach');