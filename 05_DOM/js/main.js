/**
 * Created by Mefisto on 18.07.2016.
 */

let modules = require('./modulesES5');

// 1
let myLi = document.createElement('li');
myLi.classList.add('my-class');
myLi.innerText = ('Привет');

modules.prepend('.list', myLi);


// 2
// modules.deleteTextNodes('.list');

// 3
// modules.findNode('.list');

// 4
// modules.scanDOM();