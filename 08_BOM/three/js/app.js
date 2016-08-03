searchCookieSquare('Square');

let button = document.querySelector('button');
let buttonSaveCookieMySquare = document.getElementById('Save_My_Square');

button.addEventListener('click', newSquare);
buttonSaveCookieMySquare.addEventListener('click', saveNewSquareInMyCookie);



function newSquare(){

    let oldDiv = document.getElementById('my_div');
    if(oldDiv){
        document.body.removeChild(oldDiv);
    }

    let myDiv = document.createElement('div');
    let myBackground = () => {
        let R = Math.floor(Math.random()*256);
        let G = Math.floor(Math.random()*256);
        let B = Math.floor(Math.random()*256);

        return 'rgb('+R+','+G+','+B+')';
    };
    let sizeWH = () => {
        let size = Math.floor(Math.random()*500);

        return size+'px';
    };

    myDiv.id = 'my_div';
    myDiv.style.background = myBackground();
    myDiv.style.position = 'absolute';

    myDiv.style.width = sizeWH();
    myDiv.style.height = sizeWH();
    myDiv.style.top = (Math.floor(Math.random()*window.innerHeight))+ 'px';
    myDiv.style.left = (Math.floor(Math.random()*window.innerWidth)) + 'px';

    document.body.appendChild(myDiv);

    mDrag(myDiv);
}

function mDrag(myDiv){
    let activeElement;
    let offsetX = 0;
    let offsetY = 0;

    let mDown = (e) => {
        activeElement = e.target;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    };
    let mUp = (e) => {
        activeElement = null;
    };
    let mMove = (e) => {
        if(activeElement){
            activeElement.style.top = (e.clientY - offsetY)+ 'px';
            activeElement.style.left = (e.clientX - offsetX) + 'px';
        }
    };

    myDiv.addEventListener('mousedown', mDown );
    myDiv.addEventListener('mouseup', mUp );
    document.addEventListener('mousemove', mMove );
}


function saveNewSquareInMyCookie(){
    let styleNewSquare = document.getElementById('my_div').style.cssText;
    let valueCookie = searchCookieSquare('Square') || "";

    styleNewSquare = styleNewSquare.replace(/;/g, ".");
    console.log(styleNewSquare);

    document.cookie = "Square="+ valueCookie + "" + styleNewSquare+"|";

}


function searchCookieSquare(nameCookie){
    let allCookie = document.cookie.split("; ");
    let onlyMySquare = [];

    allCookie.forEach(function(elem){
        if(!elem.indexOf(nameCookie)){
            onlyMySquare[onlyMySquare.length] = elem.split("=");
        }
    });
    
    if(onlyMySquare.length){
        renderSquareInMyWindow(onlyMySquare[0][1]);
        return onlyMySquare[0][1];
    }
}


function renderSquareInMyWindow(string){
    let createMySquare = (param) => {

        let square = document.createElement('div');
        // let newparam = param.replace(/./g, ";"); не работает, почему я хз :(
        let newparam = param.split('.');
        let newparam2 = newparam.join(";");

        square.style.cssText = newparam2;
        document.body.appendChild(square);
    };
    
    let allParam = string.split('|');
    for(let elem of allParam){
        createMySquare(elem);
    }
}