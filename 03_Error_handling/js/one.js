/**
 * Created by Mefisto on 09.07.2016.
 */



var arrAllNumbers = [1, 2, 4, 5, 6, 7, 8],
    arrSomeNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    arrNoNumbers = ['это', 'массив', 'без', 'чисел'];

function isAllTrue(source, filterFn) {
    var source = source;

    try{
        if(source.length === 0){
            throw new Error('Зачем мне пустой массив?');
        }

        for(var i = 0; i < source.length; i++){
            if(source[i] === undefined){
                throw new Error('Невидимые значения? Это что-то новенькое.');
            }
        }

        return filterFn(source);

    }catch(e){
        console.error(e.message);
    }
}

function isNumber (arr){
    let array = arr,
        isNum = true;

    array.forEach(function(item) {
        if(typeof item !== 'number'){
            isNum = false;
        }
    });
    return isNum;
}

console.log('Первое ДЗ >>>');
console.log(isAllTrue(arrAllNumbers, isNumber));
console.log(isAllTrue(arrSomeNumbers, isNumber));
console.log(isAllTrue(arrNoNumbers, isNumber));
console.log(isAllTrue(['',,], isNumber));
console.log(isAllTrue([], isNumber));
console.log('Первое ДЗ <<<');

