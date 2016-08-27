/**
 * Created by Mefisto on 27.08.2016.
 */

const fs = require('fs');
const http = require('http');
const path = require('path');
const typeMap = {
    ".html" : "text/html",
    ".css"  : "text/css",
    ".js"   : "text/javascript",
    ".json" : "application/json"
};


http.createServer(function (req, res) {
    let fileToRead = `.${req.url}`;
    let url = path.dirname(`.${req.url}`);
    console.log(req.url);
    console.log(url);

    if(fileToRead != '/') openPage(fileToRead);

    function openPage(fileToRead) {
        if(!fs.existsSync(fileToRead)) {
            fileToRead = './public/404.html';
        }
        let content = fs.readFileSync(fileToRead, {encoding: 'utf8'});
        let type = path.extname(fileToRead);

        res.setHeader('Content-Type', typeMap[type] );
        res.write(content);
    }

    res.end();

    loopDirs(url);

}).listen(3000);


function loopDirs(urll) {
    if(urll == '.') return;

    let url = urll;
    let dirs = fs.readdirSync(url);
    for(let dir of dirs){
        let stat = fs.statSync(url+'\\'+dir);

        if(stat.isDirectory()){
            console.log(dir + " " + stat.size + " bytes");
            let newUrl = path.resolve(url, dir);
            loopDirs(newUrl);

        } else if(stat.isFile()){
            console.log(dir + " " + stat.size + " bytes");
        }
    }


}