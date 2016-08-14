'use strict';

new Promise(function (resolve) {
    if (document.readyState === 'complite') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(function () {
    return new Promise(function (resolve, reject) {

        // инициализируем приложение и запрашивается авторизация
        VK.init({
            apiId: 5585272
        });

        VK.Auth.login(function (response) {
            if (response.session) {
                resolve(response);
            } else {
                reject(new Error('Не удалось авторизоваться!'));
            }
        }, 2);
    });
}).then(function () {
    return new Promise(function (resolve, reject) {
        VK.api('friends.get', { v: '5.53', 'fields': 'photo_50' }, function (response) {

            if (response.error) {
                reject(new Error(response.error.error_msg));
            } else {
                var objMyFriends = [];

                // перебираем пришедшие данные
                for (var item = 0; item < response.response.items.length; item++) {
                    objMyFriends[objMyFriends.length] = {
                        first_name: response.response.items[item].first_name,
                        last_name: response.response.items[item].last_name,
                        photo_50: response.response.items[item].photo_50
                    };
                }

                // Сортируем по имени фамилии
                objMyFriends.sort(function (a, b) {
                    if (a.first_name > b.first_name) return 1;else if (a.first_name < b.first_name) return -1;

                    if (a.last_name > b.last_name) return 1;else if (a.last_name < b.last_name) return -1;
                });

                // делаем хелпер для шаблона
                Handlebars.registerHelper('tolowercase', function (str) {
                    return str.toLowerCase();
                });

                // Отсортировываем сохранённые в localStorage объекты
                if (localStorage.checkFriendsObj) {

                    var localCheckedFriendsObj = JSON.parse(localStorage.checkFriendsObj);

                    for (var elem in objMyFriends) {
                        for (var locElem in localCheckedFriendsObj) {

                            if (objMyFriends[elem].first_name == localCheckedFriendsObj[locElem].first_name && objMyFriends[elem].last_name == localCheckedFriendsObj[locElem].last_name && objMyFriends[elem].photo_50 == localCheckedFriendsObj[locElem].photo_50) {
                                objMyFriends.splice(elem, 1);
                            }
                        }
                    };

                    // передаём и конкатенируем массивы с выбранным списком друзей в шаблон
                    var _source = template_checked.innerHTML;
                    var _templateFn = Handlebars.compile(_source);
                    var _template = _templateFn({ elems: localCheckedFriendsObj });
                    friends__list.innerHTML = _template;
                }

                // передаём и конкатенируем массивы с общим списком друзей в шаблон
                var source = template_el.innerHTML;
                var templateFn = Handlebars.compile(source);
                var template = templateFn({ elems: objMyFriends });
                friends__all_list.innerHTML = template;

                resolve();
            }
        });
    });
}).then(function () {

    var listNext = document.querySelector("[data-list='friends_next']");
    var listBack = document.querySelector("[data-list='friends_back']");

    var searchAllFriends = document.querySelector("[data-search=friend_next]");
    var searchListFriends = document.querySelector("[data-search=friend_back]");

    var styleAllFriends = document.getElementById("search__all_friends");
    var styleListFriends = document.getElementById("search__list_friends");

    listNext.addEventListener('click', togglePositionChild);
    listBack.addEventListener('click', togglePositionChild);

    // Пермещение элементов по нажатию на крестик
    function togglePositionChild(e) {
        if (e.target.dataset.move == 'friend') {

            var item = e.target.parentNode.parentNode;

            if (this.dataset.list === "friends_next") {
                listBack.appendChild(item);
            } else if (this.dataset.list === "friends_back") {
                listNext.appendChild(item);
            }
        }
    }

    // слежка за полями поиска
    searchAllFriends.addEventListener('keyup', function (event) {
        var searchVal = this.value.toLowerCase();
        styleAllFriends.innerText = '#friends__all_list li:not([data-name*=' + searchVal + ']) {display:none;}';
    });

    searchListFriends.addEventListener('keyup', function (event) {
        var searchVal = this.value.toLowerCase();
        styleListFriends.innerText = '#friends__list li:not([data-name*=' + searchVal + ']) {display:none;}';
    });

    // кнопка для сохранения объектов в localStorage
    var saveButton = document.querySelector('#saveFriend');

    // Сохраняем список выбранных друзей в localStorage    
    var checkedFriendsObj = [];

    saveButton.addEventListener('click', function () {

        // let listNext = document.querySelector("[data-list='friends_next']");
        // let listBack = document.querySelector("[data-list='friends_back']");

        var elemAllFriends = document.querySelector("[data-list='friends_next']").querySelectorAll('[data-move=item]');
        var elemCheckedFriends = document.querySelector("[data-list='friends_back']").querySelectorAll('[data-move=item]');

        elemCheckedFriends.forEach(function (elem, i) {
            var fullNameArr = elem.querySelector('.info_name').innerText;
            var full_name = fullNameArr.split(' ');
            checkedFriendsObj[i] = {
                first_name: full_name[0],
                last_name: full_name[1],
                photo_50: elem.querySelector('img').getAttribute('src')
            };
        });

        localStorage.checkFriendsObj = JSON.stringify(checkedFriendsObj);
        alert('Список друзей сохранён!');
    });
}).catch(function (e) {
    console.log('Ошибка: ' + e.message);
});
// убить авторизацию в браузере VK.Auth.revokeGrants();