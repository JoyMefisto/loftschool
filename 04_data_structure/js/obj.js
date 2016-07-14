/**
 * Created by Mefisto on 14.07.2016.
 */


var objA = {
    prop1: 'value1',
    prop2: new Date('2016/02/10'),
    prop5: 1000,
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop6: 'value2',
    prop3: 'value3'
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
    }
};

console.log(deepEqual(objA, objB)); //объекты идентичны, вернет true

function deepEqual(obj1,obj2){

    let concurrence = true,
        objA = obj1,
        objB = obj2;

    let keysFirstObj = Object.keys(objA),
        keysSecondObj = Object.keys(objB);

    if(keysFirstObj.length != keysSecondObj.length){
        return concurrence = false;
    }

    function getClass(obj) {
        return {}.toString.call(obj).slice(8, -1);
    }


    for(let prop in objA){

        if( objA[prop].getTime){

            let DateA = (objA[prop].valueOf()),
                DateB = (objB[prop].valueOf());
            
            if( DateA !== DateB ){
                return concurrence = false;
            }

        } else if( objA[prop] instanceof Object || objA[prop] instanceof Array){
            return deepEqual(objA[prop], objB[prop]);
            
        } else if(objA[prop].valueOf() !== objB[prop].valueOf()){
            return concurrence = false;
        }
    }

    return concurrence;
}