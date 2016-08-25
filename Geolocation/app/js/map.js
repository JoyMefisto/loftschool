
ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
        center: [48.7102, 44.5177],
        zoom: 17
    });

    var myPlacemark = new ymaps.Placemark([48.7102, 44.5177], {
        // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
        balloonContentHeader: "Балун метки",
        balloonContentBody: "Содержимое <em>балуна</em> метки",
        balloonContentFooter: "Подвал",
        hintContent: "Хинт метки"
    });

    myMap.geoObjects.add(myPlacemark);

}