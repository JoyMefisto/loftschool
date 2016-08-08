/**
 * Created by Mefisto on 01.08.2016.
 */

new Promise(function(resolve){
    if(document.readyState === 'complite'){
        resolve();
    }else{
        window.onload = resolve;
    }
}).then(function() {
    return new Promise(function(resolve, reject){
        VK.init({
            apiId: 5571286
        });

// на этом шаге у пользователя запрашивается авторизация
        VK.Auth.login(function(response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться!'));
            }
        }, 2);
    });
}).then(function(){
    // Возвращаем Имя Фамилию пользователя (просклонённую)
    return new Promise(function(resolve, reject) {
        VK.api('users.get', { 'fields': 'photo_200' ,'name_case': 'gen'}, function (response) {
            // console.log(response);
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                headerInfo.textContent = 'Друзья '
                    + response.response[0].first_name + ' ' + response.response[0].last_name;
                resolve();
            }
        });
    });
}).then(function(){
    return new Promise(function(resolve, reject) {
        VK.api('friends.get', { v: '5.53', 'fields': 'photo_100, bdate'}, function (response) {
            // console.log(response);
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                let obMyFriends = [];
                let nowDate = new Date();

// текущая дата
                let myDate = {
                            day : nowDate.getDate(),
                            month : nowDate.getMonth() + 1,
                            year : nowDate.getFullYear()
                            };

// вычисляем возраст
                function yearBDay(bdate) {
                    if(!bdate) return "";

                    let bDay = bdate.split('.');
                    if(!bDay[2]) return "";
                    else return myDate.year - bDay[2];
                }

// перебираем пришедшие данные
                for(let item = 0; item < response.response.items.length; item++){
                    obMyFriends[obMyFriends.length] = { first_name : response.response.items[item].first_name,
                                                        last_name : response.response.items[item].last_name,
                                                        photo_100 : response.response.items[item].photo_100,
                                                        bdate : response.response.items[item].bdate,
                                                        year : yearBDay(response.response.items[item].bdate)
                                                        }
                }

                let noBDFriend = [];
                let beforeBD = [];
                let afterBD = [];

// Сортируем по массивам тех людей у кого указано ДР и у кого нет
                let yesBDFriends = obMyFriends.filter(function(elem){
                    if(elem.bdate !== undefined){
                        return elem;
                    } else {
                        noBDFriend[noBDFriend.length] = elem;
                    }
                }).sort(function(a, b) {

                    let aDateArr = a.bdate.split('.');
                    let bDateArr = b.bdate.split('.');

                    if(parseInt(aDateArr[1]) > parseInt(bDateArr[1])) return 1;
                    else if(parseInt(aDateArr[1]) < parseInt(bDateArr[1])) return -1;

                    if(parseInt(aDateArr[0]) >= parseInt(bDateArr[0])) return 1;
                    else if(parseInt(aDateArr[0]) < parseInt(bDateArr[0])) return -1;
                });

// Сортируем по массивам людей по ДР взависимости от текущей даты
                yesBDFriends.map(function(elem){
                    let bDate = elem.bdate.split('.');
                    if(bDate[1] > myDate.month) return afterBD[afterBD.length] = elem;
                    else if(bDate[1] < myDate.month) return beforeBD[beforeBD.length] = elem;

                    if(bDate[0] >= myDate.day) return afterBD[afterBD.length] = elem;
                    else if(bDate[0] < myDate.day) return beforeBD[beforeBD.length] = elem;
                });

// передаём и конкатенируем массивы в шаблон
                let source = template_el.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({ elems: [].concat(afterBD, beforeBD, noBDFriend)});
                friends.innerHTML = template;

                resolve();
            }
        });
    });
}).catch(function(e){
    console.log('Ошибка: ' + e.message);
});
// убить авторизацию в браузере VK.Auth.revokeGrants();

