/**
 * Created by Mefisto on 09.07.2016.
 */

var arrAllNumbers = [1, 2, 4, 5, 6, 7, 8],
    arrSomeNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    arrNoNumbers = ['это', 'массив', 'без', 'чисел'];

function isSomeTrue(source, filterFn) {
    var source = source;

    try{
        if(source.length === 0){
            throw new Error('Зачем мне пустой массив?');
        }

        let i, boolFilterFn = false;
        for(i = 0; i < source.length; i++){
            if(!filterFn(source[i])){
                return boolFilterFn = true;
            };
        }
        return boolFilterFn;

    }catch(e){
        console.error(e.message);
    }
}

function isNoNumber (item){
    let num = item,
        isNotNum = false;

    if(typeof num !== 'number'){
        isNotNum = true;
    }
    return isNotNum;
}

console.log('Второе ДЗ >>>');

console.log(isSomeTrue(arrAllNumbers, isNoNumber));
console.log(isSomeTrue(arrSomeNumbers, isNoNumber));
console.log(isSomeTrue(arrNoNumbers, isNoNumber));
console.log(isSomeTrue(['',,], isNoNumber));
console.log(isSomeTrue([], isNoNumber));

console.log('Второе ДЗ <<<');