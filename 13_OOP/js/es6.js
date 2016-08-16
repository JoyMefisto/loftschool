/**
 * Created by Mefisto on 17.08.2016.
 */

// Class Calculator
class Calculator {
    constructor(firstNumber){
        this.firstNumber = firstNumber;
    };

    sum() {
        let i, argSum = 0;
        for(i = 0; i < arguments.length; i++){
            argSum += arguments[i];
        }
        return this.firstNumber + argSum;
    };
    dif() {
        let i, argDif = 0;
        for(i = 0; i < arguments.length; i++){
            argDif += arguments[i];
        }
        return this.firstNumber - argDif;
    }
    div(num) {
        let i, argDiv = this.firstNumber;
        for(i = 0; i < arguments.length; i++){
            if(arguments[i] !== 0){
                argDiv = argDiv / arguments[i];
            }
        }
        return argDiv;
    }
    mul(num) {
        let i, argMul = this.firstNumber;
        for(i = 0; i < arguments.length; i++){
            argMul = argMul * arguments[i];
        }
        return argMul;
    }

};


// Наследуем constructor
class SqrCalc extends Calculator{
    constructor(firstNumber){
        super(firstNumber);
        this.firstNumber = firstNumber;
    }
    // Наследуем методы родительского класса и изменяем их
    sum(... arr) {
        let result = super.sum(... arr);
        return (result * result);
    }

    dif(... arr) {
        let result = super.dif(... arr);
        return (result * result);
    }
    div(... arr) {
        let result = super.div(... arr);
        return (result * result);
    }
    mul(... arr) {
        let result = super.mul(... arr);
        return (result * result);
    }
};




let myCalculator = new SqrCalc(100);

console.log('Третье ДЗ >>>');
console.log(myCalculator.sum(1, 2, 3)); //вернет 106 * sqrt = 11236
console.log(myCalculator.dif(10, 20)); //вернет 70 * sqrt = 4900
console.log(myCalculator.div(2, 2)); //вернет 25 * sqrt = 625
console.log(myCalculator.mul(2, 2)); //вернет 400 * sqrt = 160 000
console.log('Третье ДЗ <<<');