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



// SPLICE НЕ ДОДЕЛАННЫЙ :(


// splice
// index[, deleteCount, elem1, ..., elemN]

// function splice(arr, index, deleteCount){
//     let
//         array = arr,
//         delCount = deleteCount,
//         pointStart = index,
//         allElems = [],
//         argElems = [],
//         y = 0,
//         i = 0;
//
//     if(pointStart < 0) {
//         i = y = array.length + pointStart;
//         delCount = array.length-2;
//     }
//
// // arguments[]
//     for(let j = 3; j < arguments.length; j++){
//         argElems[argElems.length] = arguments[j];
//     }
//
// // allElem[]
//     for(i ; i < array.length; i++){
//
//         if(pointStart === i && delCount >= 0){
//
//             if(argElems.length !== 0){
//                 for(let k = 0; k < argElems.length; k++){
//                     allElems[allElems.length] = argElems[k];
//                 }
//             }
//             if((i + delCount) > array.length){
//                 return allElems;
//                 i = array.length-1;
//             } else {
//                 i = i + delCount;
//                 return allElems;
//             }
//         }
//
//         allElems[allElems.length] = array[i];
//
//         if(pointStart < 0 && y === i){
//
//             if(argElems.length !== 0){
//                 for(let k = 0; k < argElems.length; k++){
//                     allElems[allElems.length] = argElems[k];
//                 }
//             }
//         }
//     }
//
//     if(pointStart > array.length){
//         if(argElems.length !== 0){
//             for(let k = 0; k < argElems.length; k++){
//                 allElems[allElems.length] = argElems[k];
//             }
//         }
//         if((i + delCount) > array.length){
//             return allElems;
//             i = array.length-1;
//         } else {
//             i = i + delCount;
//             return allElems;
//         }
//     }
//
//     return allElems;
//
// }
//
// console.log(splice(array, 20,0, 33,44) + ' Первое');
// console.log(splice(array, 0,20, 33,44) + " Второе");
// console.log(splice(array, 20,20, 33,44) + " Третье");
// console.log(splice(array, 0,0, 33,44) + " Четвёртое");
// console.log(splice(array, 0,7, 33,44) + " Пятое");
// console.log(splice(array, -1,0, 33,44) + " Шестое");
// console.log(splice(array, -2,2, 33,44) + " Седьмое");
// console.log(splice(array, -3,0, 33,44) + " Восьмое");















