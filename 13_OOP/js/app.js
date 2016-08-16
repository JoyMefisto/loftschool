/**
 * Created by Mefisto on 15.08.2016.
 */

function Calculator(firstNumber) {
    this.firstNumber = firstNumber;
};

Calculator.prototype.sum = function () {
    let i, argSum = 0;
    for(i = 0; i < arguments.length; i++){
        argSum += arguments[i];
    }
    return this.firstNumber + argSum;
}
Calculator.prototype.dif = function () {
    let i, argDif = 0;
    for(i = 0; i < arguments.length; i++){
        argDif += arguments[i];
    }
    return this.firstNumber - argDif;
}
Calculator.prototype.div = function (num) {
    let i, argDiv = this.firstNumber;
    for(i = 0; i < arguments.length; i++){
        if(arguments[i] !== 0){
            argDiv = argDiv / arguments[i];
        }
    }
    return argDiv;
}

Calculator.prototype.mul = function (num) {
    let i, argMul = this.firstNumber;
    for(i = 0; i < arguments.length; i++){
        argMul = argMul * arguments[i];
    }
    return argMul;
}

function SqrCalc(firstNumber) {
    this.firstNumber = firstNumber;

    this.sqrtCals = function (num) {
        return (num * num);
    }
}

SqrCalc.prototype = Object.create(Calculator.prototype);




let myCalculator = new SqrCalc(100);
console.log(myCalculator);

console.log('Третье ДЗ >>>');
console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400
console.log('Третье ДЗ <<<');