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
                let myDate = {
                            day : nowDate.getDate(),
                            month : nowDate.getMonth() + 1
                            };
                for(let item = 0; item < response.response.items.length; item++){
                    obMyFriends[obMyFriends.length] = { first_name : response.response.items[item].first_name,
                                                        last_name : response.response.items[item].last_name,
                                                        photo_100 : response.response.items[item].photo_100,
                                                        bdate : response.response.items[item].bdate
                                                        }
                }

                let newObMyFriends = obMyFriends.filter(function(elem){
                    if(elem.bdate !== undefined){
                        return elem;
                    }
                }).sort(function(a, b) {
                    let aDateArr = a.bdate.split('.');
                    let bDateArr = b.bdate.split('.');


                    if(parseInt(aDateArr[1]) > parseInt(bDateArr[1])) return 1;
                    else if(parseInt(aDateArr[1]) < parseInt(bDateArr[1])) return -1;

                    if(parseInt(aDateArr[0]) >= parseInt(bDateArr[0])) return 1;
                    else if(parseInt(aDateArr[0]) < parseInt(bDateArr[0])) return -1;

                });

                console.log(myDate);


                let source = template_el.innerHTML;
                let templateFn = Handlebars.compile(source);
                let template = templateFn({ elems: newObMyFriends});
                friends.innerHTML = template;

                resolve();
            }
        });
    });
}).catch(function(e){
    console.log('Ошибка: ' + e.message);
});
// убить авторизацию в браузере VK.Auth.revokeGrants();


// используем шаблонизатор Handlebars
// let source = template_el.innerHTML;
// let templateFn = Handlebars.compile(source);
// let template = templateFn({ elems: arrElems});
//
// list.innerHTML = template;

