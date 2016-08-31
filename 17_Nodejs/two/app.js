/**
 * Created by Mefisto on 27.08.2016.
 */

// const fs = require('fs');
// const http = require('http');
// const path = require('path');
// const typeMap = {
//     ".html" : "text/html",
//     ".css"  : "text/css",
//     ".js"   : "text/javascript",
//     ".json" : "application/json"
// };
//
// // let data = [];
// http.createServer(function (req, res) {
//
//     // Получаем запрошенный путь
//     let fileToRead = `./public${req.url}`;
//
//     // Если запрошенный путь не корневой, а с какими то ещё папками или файлами (index.html), то ищем его
//     if(fileToRead != './public') openPage(fileToRead);
//
//     function openPage(fileToRead) {
//         // Если в файловой системе нет такого пути то 404
//         if(!fs.existsSync(fileToRead)) {
//             fileToRead = './public/404.html';
//         }
//
//         // Чтение файла
//         let content = fs.readFileSync(fileToRead, {encoding: 'utf8'});
//         // Возращает расширение файла
//         let type = path.extname(fileToRead);
//
//         // Указываем заголовок
//         res.setHeader('Content-Type', typeMap[type] );
//         // Отправляем файл
//         res.write(content);
//     }
//
//     if(path.extname(fileToRead) === ".html"){
//         // Получаем папку этого пути
//         let url = path.dirname(fileToRead);
//
//         loopDirs(url);
//     }
//     function loopDirs(url) {
//
//         let dirs = fs.readdirSync(url);
//         for(let dir of dirs){
//             let stat = fs.statSync(url+'\\'+dir);
//
//             if(stat.isDirectory()){
//                 // data[data.length] = {
//                 //     "name": dir,
//                 //     "size": stat.size
//                 // };
//                 res.write(dir + " " + stat.size + " bytes");
//                 let newUrl = path.resolve(url, dir);
//                 loopDirs(newUrl);
//
//             } else if(stat.isFile()){
//                 // data[data.length] = {
//                 //     "name": dir,
//                 //     "size": stat.size
//                 // };
//                 res.write(dir + " " + stat.size + " bytes");
//             }
//         }
//
//     }
//
//     res.end();
//
// }).listen(3000);


//  ajax ajax ajax ajax ajax <--------------------------------------------------> ajax ajax ajax ajax ajax ajax
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

let data = [];
http.createServer(function (req, res) {

    // Получаем запрошенный путь
    let fileToRead = `./public${req.url}`;

    if(path.extname(fileToRead) == '.html'){
        // Получаем папку этого пути
        let url = path.dirname(fileToRead);
        loopDirs(url);

        fs.writeFileSync(url+"/data.json", JSON.stringify(data));
    }

    // Если запрошенный путь не корневой, а с какими то ещё папками или файлами (index.html), то ищем его
    if(fileToRead != './public') openPage(fileToRead);

    function openPage(fileToRead) {
        // Если в файловой системе нет такого пути то 404
        if(!fs.existsSync(fileToRead)) {
            fileToRead = './public/404.html';
        }

        // Чтение файла
        let content = fs.readFileSync(fileToRead, {encoding: 'utf8'});
        // Возращает расширение файла
        let type = path.extname(fileToRead);

        // Указываем заголовок
        res.setHeader('Content-Type', typeMap[type] );
        // Отправляем файл
        res.write(content);
    }

    res.end();

}).listen(3000);



function loopDirs(url) {

    let dirs = fs.readdirSync(url);
    for(let dir of dirs){
        let stat = fs.statSync(url+'\\'+dir);

        if(stat.isDirectory()){
            data[data.length] = {
                "name": dir,
                "size": stat.size
            };
            let newUrl = path.resolve(url, dir);
            loopDirs(newUrl);

        } else if(stat.isFile()){
            data[data.length] = {
                "name": dir,
                "size": stat.size
            };
        }
    }

}


// Для вывода в консоле:
//
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "data.json");
// xhr.responseType = 'json';
// xhr.addEventListener('load', function(){
//     console.log('Пришёл ответ', xhr.response);
// });
// xhr.send();