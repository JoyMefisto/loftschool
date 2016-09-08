/**
 * Created by Mefisto on 25.07.2016.
 */

// Получаем спеисок городов через AJAX
function sendAjax(url){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            resolve(xhr.response);
        });
        xhr.addEventListener('error', () => {
            reject();
        });

        xhr.send();
    });
}

let citys = [];
// Сортируем список городов по алфавиту
sendAjax('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then((response)=>{

    for({name} of response){
        citys[citys.length] = name;
    }

    citys.sort();

}, () => {
    console.log('Ошибка!');
});

// выводим название городов совпавшие с введеными буквами в input'e
search_sity.addEventListener('keyup', function(){
    let valueInput = this.value;

    if(valueInput === ""){
        list.innerHTML = "";
        return false;
    }

    list.innerHTML = "";
    for(let city in citys){
        if((citys[city].toLowerCase()).indexOf(valueInput.toLowerCase()) !== -1){
       
            let el = document.createElement('li');
            let link = document.createElement('a');
            el.appendChild(link);

            el.classList.add('item');
            link.classList.add('link');

            link.innerText = citys[city];
            list.appendChild(el);
        }
    }
});

// вставляем в поле выбранный город
list.addEventListener('click', function(e){
    let linkValue = e.target.text;

    search_sity.value = linkValue;
    list.innerHTML = "";
});
