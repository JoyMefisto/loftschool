/**
 * Created by Mefisto on 26.08.2016.
 */

let fs = require('fs');
let path = require('path');
let url = path.resolve('./');



function loopDirs(url) {

    let dirs = fs.readdirSync(url);
    // dirs = [ 'fileweigth.js', 'level_1' ]

    for(let dir of dirs){

        // url+'\\'+dir = d:\GitHub\loftschool\17_Nodejs\one\ + fileweigth.js
        let stat = fs.statSync(url+'\\'+dir);

        if(stat.isDirectory()){
            console.log(dir, stat.size + " bytes");

            let newUrl = path.resolve(url, dir);
            // newUrl = d:\GitHub\loftschool\17_Nodejs\one\level_1

            loopDirs(newUrl);

        } else if(stat.isFile()){
            console.log(dir, stat.size + " bytes");
        }
    }
}

loopDirs(url);