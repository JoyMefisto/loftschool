/**
 * Created by Mefisto on 25.07.2016.
 */


function timer(time){

    return new Promise((resolve, reject)=>{
        
        setTimeout(()=>{
            resolve();
        },time);
    })
}


module.exports = timer;