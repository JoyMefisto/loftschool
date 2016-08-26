/**
 * Created by Mefisto on 26.08.2016.
 */

let fs = require('fs');
let url = './';
let dirs = fs.readdirSync(url);


function loopDirs(dirs) {

    for(let dir of dirs){
        let stat = fs.statSync(dir);

        if(stat.isDirectory()){
            url += dir;
            console.log(url);
            console.log(fs.readdirSync(url));
            loopDirs(fs.readdirSync(url));
        } else if(stat.isFile()){
            console.log(dir, stat.size + " bytes");
        }

    }
}

loopDirs(dirs);