'use strict';
let arrays = require('./array');

let array = [1, 2, 3, 4, 5, 6];


// forEach
arrays.forEach(array,function(item,i,arr){
    console.log("Значение: " + item + " Индекс: " + item + " массив: [" + arr + "]");
});


// map
let newMap = arrays.map(array,function(item,i,arr){
    return item*item;
});
console.log(newMap);


// filter
let newFilter = arrays.filter(array,function(item,i,arr){
    return item > 3;
});
console.log(newFilter);


// reduce
let newReduce = arrays.reduce(array, function(result, item, i, arr){
    return result + item;
},0);
console.log(newReduce);


// slice
let newSlice = arrays.slice(array, 1,4);
console.log(newSlice);