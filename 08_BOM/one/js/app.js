/**
 * Created by Mefisto on 29.07.2016.
 */

let arrCookie = [];
let table = document.body.querySelector('#table_cookie tbody');
let buttonDel = document.createElement('button');

document.cookie.split("; ").forEach(cookie => {arrCookie[arrCookie.length] = cookie.split("=")});

buttonDel.setAttribute('type','button');
buttonDel.setAttribute('class','btn btn-danger');
buttonDel.setAttribute('data-button','delete');
buttonDel.innerText = 'Удалить';

getCookie(arrCookie);

// add cookie in table
function getCookie(arrCookie) {

    for (let el of arrCookie) {
        let tr = document.createElement('tr');

        let nameCookie = document.createElement('td');

        nameCookie.innerText = el[0];
        let valueCookie = document.createElement('td');

        valueCookie.innerText = el[1];
        let button = document.createElement('td');

        button.appendChild(buttonDel.cloneNode(true));
        tr.appendChild(nameCookie);

        tr.appendChild(valueCookie);
        tr.appendChild(button);
        table.appendChild(tr);

    }
}

function removeCookie(name, value){
    var today = new Date();
    var str = today.toGMTString();
    document.cookie = `${name}=${value}; expires=${str};`
}

table.addEventListener('click', e => {

    if(e.target.dataset.button === 'delete'){
        let tr = e.target.closest('tr');
        let nameCookie = tr.childNodes[0].innerText;
        let valueCookie = tr.childNodes[1].innerText;
        let answerDel = confirm(`Удалить cookie с именем ${nameCookie}?`);

        if(answerDel){
            removeCookie(nameCookie, valueCookie);
            tr.remove();
        }
    }
});


