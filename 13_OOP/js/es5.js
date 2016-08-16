/**
 * Created by Mefisto on 15.08.2016.
 */

// Class Calculator
function Calculator(firstNumber) {
    this.firstNumber = firstNumber;
};

Calculator.prototype.sum = function () {
    let i, argSum = 0;
    for(i = 0; i < arguments.length; i++){
        argSum += arguments[i];
    }
    return this.firstNumber + argSum;
};
Calculator.prototype.dif = function () {
    let i, argDif = 0;
    for(i = 0; i < arguments.length; i++){
        argDif += arguments[i];
    }
    return this.firstNumber - argDif;
};
Calculator.prototype.div = function (num) {
    let i, argDiv = this.firstNumber;
    for(i = 0; i < arguments.length; i++){
        if(arguments[i] !== 0){
            argDiv = argDiv / arguments[i];
        }
    }
    return argDiv;
};
Calculator.prototype.mul = function (num) {
    let i, argMul = this.firstNumber;
    for(i = 0; i < arguments.length; i++){
        argMul = argMul * arguments[i];
    }
    return argMul;
};

// Class SqrCalc
function SqrCalc(firstNumber) {
    Calculator.call(this, firstNumber);

    this.firstNumber = firstNumber;
};

// Наследуем конструктор и методы
SqrCalc.prototype = Object.create(Calculator.prototype);


// Наследуем методы родительского класса и изменяем их
SqrCalc.prototype.sum = function () {
    let result = Calculator.prototype.sum.apply(this, arguments);
    return (result * result);
};
SqrCalc.prototype.dif = function () {
    let result = Calculator.prototype.dif.apply(this, arguments);
    return (result * result);
};
SqrCalc.prototype.div = function () {
    let result = Calculator.prototype.div.apply(this, arguments);
    return (result * result);
};
SqrCalc.prototype.mul = function () {
    let result = Calculator.prototype.mul.apply(this, arguments);
    return (result * result);
};

let myCalculator = new SqrCalc(100);

console.log('Третье ДЗ >>>');
console.log(myCalculator.sum(1, 2, 3)); //вернет 106 * sqrt = 11236
console.log(myCalculator.dif(10, 20)); //вернет 70 * sqrt = 4900
console.log(myCalculator.div(2, 2)); //вернет 25 * sqrt = 625
console.log(myCalculator.mul(2, 2)); //вернет 400 * sqrt = 160 000
console.log('Третье ДЗ <<<');