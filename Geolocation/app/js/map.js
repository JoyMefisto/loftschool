// var myMap, myPlacemark;

// ymaps.ready(function () {
     
//     myMap = new ymaps.Map('map', {
//         center: [48.7102, 44.5177],
//         zoom: 17
//     });
        
//     // myPlacemark = new ymaps.Placemark([48.7102, 44.5177]);


//     // myMap.geoObjects.add(myPlacemark);
// });


ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
			center: [48.7102, 44.5177],
			zoom: 17
        }),
        myPlacemark = new ymaps.Placemark([48.7102, 44.5177], {
            // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            balloonContentHeader: "Балун метки",
            balloonContentBody: "Содержимое <em>балуна</em> метки",
            balloonContentFooter: "Подвал",
            hintContent: "Хинт метки"
        });

    myMap.geoObjects.add(myPlacemark);

    // Открываем балун на карте (без привязки к геообъекту).
    // myMap.balloon.open([48.2102, 44.0177], "Содержимое балуна", {
    //     // Опция: не показываем кнопку закрытия.
    //     closeButton: false
    // });

    // Показываем хинт на карте (без привязки к геообъекту).
    // myMap.hint.show(myMap.getCenter(), "Содержимое хинта", {
    //     // Опция: задержка перед открытием.
    //     showTimeout: 1500
    // });
}