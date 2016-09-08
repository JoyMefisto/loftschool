/**
 * Created by Mefisto on 14.07.2016.
 */


var objA = {
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop1: 'value1',
    prop2: new Date('2016/02/10'),
    prop5: 1000,
    prop6: 'value2',
    prop3: 'value3',
    prop7: (function(a,b){
        let num = a + b;
    })
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop6: 'value2',
    prop2: new Date('2016/02/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    },
    prop7: (function(a,b){
        let num = a + b;
    })
};

console.log(deepEqual(objA, objB));

function deepEqual(obj1,obj2){

    let
        objA = obj1,
        objB = obj2;

    let keysFirstObj = Object.keys(objA),
        keysSecondObj = Object.keys(objB);

    if(keysFirstObj.length != keysSecondObj.length){
        return false;
    }

    for(let prop in objA){

        if(objA[prop] instanceof Object){
            if(objA[prop] instanceof Date){
                if(!inspectionDate(objA[prop], objB[prop])) return false;
            } else if(objA[prop] instanceof Array){
                if(!inspectionArray(objA[prop], objB[prop])) return false;
            } else if(typeof objA[prop] === 'function'){
                if(!inspectionFunc(objA[prop], objB[prop])) return false;
            }else {
                if(!deepEqual(objA[prop], objB[prop])) return false;
            }

        } else {
            if(objA[prop] !== objB[prop]) return false;
        }
    }
    return true;
}

function inspectionDate(d1,d2){
    return (d2 instanceof Date) ? d1.valueOf() === d2.valueOf() : false;
}

function inspectionArray(array1, array2){
    if(array2 instanceof Array){

        for(let i = array1.length; i >= 0; i-- ){
            if(array1[i] instanceof Object){
                if(array1[i] instanceof Date){
                    if(!inspectionDate(array1[i], array2[i])) return false;
                } else if(array1[i] instanceof Array){
                    if(!inspectionArray(array1[i], array2[i])) return false;
                } else if(typeof array1[i] === 'function'){
                    if(!inspectionFunc(array1[i], array2[i])) return false;
                } else {
                    if(!deepEqual(array1[i], array2[i])) return false;
                }

            } else {
                if(array1[i] !== array2[i]) return false;
            }
        }

        return true;
    }

}

function inspectionFunc(func1, func2){
    if(typeof func2 === 'function'){
        if(func1.toString() !== func2.toString()) return false;
    }
    return true;
}