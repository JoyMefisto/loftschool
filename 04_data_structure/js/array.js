/**
 * Created by Mefisto on 12.07.2016.
 */

'use strict';

// forEach
function forEach(arr, callbackFunc, thisArg){
    let i;
    for(i = 0; i < arr.length; i++){
        callbackFunc.call(thisArg, arr[i], i ,arr);
    }
}

// map
function map(arr, callbackFunc, thisArg){
    let i, array = [];
    for(i = 0; i < arr.length; i++){
        array[array.length] = callbackFunc.call(thisArg, arr[i], i ,arr);
    }
    return array;
}


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


// reduce
function reduce(arr, callbackFunc, firstValue){
    let i, result = firstValue;

    for(i = 0; i < arr.length; i++){
        result = callbackFunc.call(null, result, arr[i], i ,arr);
    }

    return result;
}


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

module.exports = {
    forEach: forEach,
    filter: filter,
    map: map,
    reduce: reduce,
    slice:slice
}