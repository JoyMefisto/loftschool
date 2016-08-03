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
    return new Promise(function(resolve, reject) {
        VK.api('users.get', { 'fields': 'photo_200' ,'name_case': 'gen'}, function (response) {
            console.log(response);
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
        VK.api('friends.get', { 'fields': 'photo_200' ,'name_case': 'nom'}, function (response) {
            console.log(response);
            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                headerInfo.textContent = 'Музыка на странице '
                    + response.response[0].first_name + ' ' + response.response[0].last_name;
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

