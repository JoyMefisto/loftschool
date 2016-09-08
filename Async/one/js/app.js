/**
 * Created by Mefisto on 25.07.2016.
 */

let timer = require('./module');

timer(3000).then(()=>{
   console.log('Я вывелась через 3 секунды')
});