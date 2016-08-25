//
// ymaps.ready(init);
//
// function init () {
//     var myMap = new ymaps.Map("map", {
//         center: [48.71836216917589,44.50863612385628],
//         zoom: 17
//     });
//
//     var myPlacemark = new ymaps.Placemark([48.71836216917589,44.50863612385628], {
//         // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
//         balloonContentHeader: "Балун метки",
//         balloonContentBody: "Содержимое <em>балуна</em> метки",
//         balloonContentFooter: "Подвал",
//         hintContent: "Хинт метки"
//     });
//
//     myMap.geoObjects.add(myPlacemark);
//
// }


ymaps.ready(init);

function init () {
    var map = new ymaps.Map('map', {
            center: [48.71836216917589,44.50863612385628],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        }),
        counter = 0,

        // Создание макета содержимого балуна.
        // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="modal" style="display: none;">' +
                '<header class="modal__header">' +
                    '<i class="placemark"></i><h5 class="title">Невский проспект 86 Волгоград 400000</h5><i class="close"></i>' +
                '</header>' +
                '<main class="modal__main">' +
                    '<ul class="modal__main_list">' +
                        '<li class="modal__main_item">' +
                            '<span class="name">Артём Шанин</span>' +
                            '<span class="date">Шоколадница 20.08.2016</span>' +
                            '<div class="text">Бегите, глупцы!!!</div>' +
                        '</li>' +
                        '<li class="modal__main_item">' +
                            '<span class="name">Артём Шанин</span>' +
                            '<span class="date">Шоколадница 20.08.2016</span>' +
                            '<div class="text">Бегите, глупцы!!!</div>' +
                        '</li>' +
                        '<li class="modal__main_item">' +
                            '<span class="name">Артём Шанин</span>' +
                            '<span class="date">Шоколадница 20.08.2016</span>' +
                            '<div class="text">Бегите, глупцы!!!</div>' +
                        '</li>' +
                        '<li class="modal__main_item">' +
                            '<span class="name">Артём Шанин</span>' +
                            '<span class="date">Шоколадница 20.08.2016</span>' +
                            '<div class="text">Бегите, глупцы!!!</div>' +
                        '</li>' +
                    '</ul>' +
                '</main>' +
                '<form action="#" class="modal__form">' +
                    '<h6 class="modal__form_title">Ваш отзыв</h6>' +
                    '<input type="text" class="input style_form" name="name" placeholder="Ваше имя">' +
                    '<input type="text" class="input style_form" name="placemark" placeholder="Укажите место">' +
                    '<textarea name="comment" class="textarea style_form" id="comment" cols="10" rows="4" placeholder="Поделитесь впечатлениями"></textarea>' +
                    '<a href="javascript:void(0);" class="button">Добавить</a>' +
                '</form>' +
            '</div>'


            // '<div style="margin: 10px;">' +
            // '<b>{{properties.name}}</b><br />' +
            // '<i id="count"></i> ' +
            // '<button id="counter-button"> +1 </button>' +
            // '</div>'
            , {

                // Переопределяем функцию build, чтобы при создании макета начинать
                // слушать событие click на кнопке-счетчике.
                build: function () {
                    // Сначала вызываем метод build родительского класса.
                    BalloonContentLayout.superclass.build.call(this);
                    // А затем выполняем дополнительные действия.
                    $('#counter-button').bind('click', this.onCounterClick);
                    $('#count').html(counter);
                },

                // Аналогично переопределяем функцию clear, чтобы снять
                // прослушивание клика при удалении макета с карты.
                clear: function () {
                    // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                    // а потом вызываем метод clear родительского класса.
                    $('#counter-button').unbind('click', this.onCounterClick);
                    BalloonContentLayout.superclass.clear.call(this);
                },

                onCounterClick: function () {
                    $('#count').html(++counter);
                    if (counter == 5) {
                        alert('Вы славно потрудились.');
                        counter = 0;
                        $('#count').html(counter);
                    }
                }
            });

    var placemark = new ymaps.Placemark([48.71836216917589,44.50863612385628], {
        name: 'Считаем'
    }, {
        balloonContentLayout: BalloonContentLayout,
        // Запретим замену обычного балуна на балун-панель.
        // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
        balloonPanelMaxMapArea: 0
    });

    map.geoObjects.add(placemark);
}