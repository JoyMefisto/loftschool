

ymaps.ready(init);

function init() {
    var myPlacemarks = [],
        myMap = new ymaps.Map('map', {
            center: [48.71836216917589,44.50863612385628],
            zoom: 17
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        myPlacemarks[myPlacemarks.length] = createPlacemark(coords);
        myMap.geoObjects.add(myPlacemarks[myPlacemarks.length-1]);

        getAddress(coords);
        console.log(myPlacemarks);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: false
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemarks[myPlacemarks.length-1].properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemarks[myPlacemarks.length-1].properties
                .set({
                    iconCaption: firstGeoObject.properties.get('name'),
                    balloonContent: firstGeoObject.properties.get('text')
                });
        });
    }
}
