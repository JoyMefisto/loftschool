renderSquareInMyWindow();

let button = document.querySelector('button');
let buttonSaveCookieMySquare = document.getElementById('Save_My_Square');
let counterSquare = 0;

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
    counterSquare++;
    let square = document.getElementById('my_div');

    let squareBg = square.style.background;
    let squareTop = square.style.top;
    let squareLeft = square.style.left;
    let squareWidth = square.style.width;
    let squareHeight = square.style.height;

    document.cookie = "SquareNumber_"+counterSquare+"=background:"+squareBg+"| top:"+squareTop+"| left:"
        +squareLeft+"| width:"+squareWidth+"| height:"+squareHeight+";";

    // console.log(document.cookie);
}

function renderSquareInMyWindow(){
    let allCookie = document.cookie.split("; ");
    let onlyMySquare = [];

    let createMySquare = (arr) => {
        let square = document.createElement('div');
        square.style.position = 'absolute';

        arr.forEach(function(item){
            square.style.cssText += item;
        });
        document.body.appendChild(square);
    };

    allCookie.forEach(function(elem){
       if(!elem.indexOf('Square')){
           onlyMySquare[onlyMySquare.length] = elem.split("=");
       }
    });

    for(let elem of onlyMySquare){
        let allParam = elem[1].split('|');
        createMySquare(allParam);
    }
}