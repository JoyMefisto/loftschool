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

// Сортируем список городов по алфавиту и выводим
sendAjax('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then((response)=>{
    let citys = [];

    for({name} of response){
        citys[citys.length] = name;
    }

    citys.sort();

    for(city in citys){
        let div = document.createElement('div');
        div.innerText = citys[city];
        document.body.appendChild(div);
    }
}, () => {
    console.log('Ошибка!');
});

