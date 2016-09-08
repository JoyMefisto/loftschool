/**
 * Created by Mefisto on 18.07.2016.
 */

let modules = require('./modulesES5');

// Задани 1
let myLi = document.createElement('li');
myLi.classList.add('my-class');
myLi.innerText = ('Привет');

modules.prepend('.list', myLi);


// Задани 2
// modules.deleteTextNodes('.list');

// Задани 3
// modules.findNode('.list');

// Задани 4
// modules.scanDOM();