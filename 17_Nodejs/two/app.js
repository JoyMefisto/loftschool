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

// let data = [];
http.createServer(function (req, res) {

    let fileToRead = `.${req.url}`;
    let url = path.dirname(`.${req.url}`);

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

    function loopDirs(urll) {
        if(urll == '.') return;

        let url = urll;
        let dirs = fs.readdirSync(url);
        for(let dir of dirs){
            let stat = fs.statSync(url+'\\'+dir);

            if(stat.isDirectory()){
                // data[data.length] = dir + " " + stat.size + " bytes";
                res.write(dir + " " + stat.size + " bytes");
                let newUrl = path.resolve(url, dir);
                loopDirs(newUrl);

            } else if(stat.isFile()){
                // data[data.length] = dir + " " + stat.size + " bytes";
                res.write(dir + " " + stat.size + " bytes");
            }
        }
    }

    loopDirs(url);
    res.end();

}).listen(3000);