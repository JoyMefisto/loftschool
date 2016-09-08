/**
 * Created by Mefisto on 29.07.2016.
 */

let arrCookie = [];

let table = document.body.querySelector('#table_cookie').appendChild(document.createElement('tbody'));
let buttonDel = document.createElement('button');
let buttonAdd = document.querySelector('#addCookie');
let formAddCookie = document.querySelector('form');

document.cookie.split("; ").forEach(cookie => {arrCookie[arrCookie.length] = cookie.split("=")});

buttonDel.setAttribute('type','button');
buttonDel.setAttribute('class','btn btn-danger');
buttonDel.setAttribute('data-button','delete');
buttonDel.innerText = 'Удалить';

getCookie(arrCookie);

// добавление всех cookie в table
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

// Присвоение cookie просроченной даты
function removeCookie(name, value){
    var today = new Date();
    var str = today.toGMTString();
    document.cookie = `${name}=${value}; expires=${str};`
}

// Удаление cookie
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

// event delete
buttonAdd.addEventListener('click', (e) => {

    let arrCookie = [];
    let nameCookie = formAddCookie.querySelector('#nameCookie').value;
    let valueCookie = formAddCookie.querySelector('#valueCookie').value;

    let dateCookie = +(formAddCookie.querySelector('#dateCookie').value);
    let today = new Date();
    today.setDate(today.getDate()+dateCookie);

    if(nameCookie == '' || valueCookie == '' || dateCookie == ''){
        return alert('Введите данные!');
    }

    if(document.cookie.indexOf(nameCookie)){
        document.cookie = `${nameCookie}=${valueCookie}; expires=${today};`
    }

    document.cookie.split("; ").forEach(cookie => {arrCookie[arrCookie.length] = cookie.split("=")});
    table.innerHTML = "";
    getCookie(arrCookie);

    formAddCookie.reset();
})

