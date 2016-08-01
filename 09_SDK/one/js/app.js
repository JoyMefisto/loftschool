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
            if(xhr.status === 200) resolve(xhr.response);
        });
        xhr.addEventListener('error', () => {
            reject(xhr.status);
        });

        xhr.send();
    });
}

let cities = [];
// Сортируем список городов по алфавиту
sendAjax('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then((response)=>{

    for({name} of response){
        cities[cities.length] = name;
    }

    cities.sort();

}, (response) => {
    console.log('Ошибка номер: ' + response);
});

// выводим название городов совпавшие с введеными буквами в input'e
search_sity.addEventListener('keyup', function(){
    let valueInput = this.value;
    let arrElems = [];

    list.innerHTML = "";
    if(!valueInput.length) return false;

    for(let city in cities){
        if((cities[city].toLowerCase()).indexOf(valueInput.toLowerCase()) !== -1) arrElems[arrElems.length] = cities[city];
    }

// используем шаблонизатор Handlebars
    let source = template_el.innerHTML;
    let templateFn = Handlebars.compile(source);
    let template = templateFn({ elems: arrElems});

    list.innerHTML = template;
});

// вставляем в поле выбранный город
list.addEventListener('click', function(e){
    let linkValue = e.target.text;

    search_sity.value = linkValue;
    list.innerHTML = "";
});
