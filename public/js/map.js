//Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
  if (document.querySelector('#map') === null) {
    return
  }
  let result = document.getElementById('result'), // для отладки

    // координаты
    destinations = {
      'moscow': [55.752222, 37.595132],
      // 'yerevan': [40.184987, 44.508378]
    },

    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
      center: destinations['moscow'], // Москва
      zoom: 17
    });

  let placemark = new ymaps.Placemark(destinations[['moscow']], {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/map-mark.svg',
    iconImageSize: [124, 124],
    iconImageOffset: [-59, -44]
  });
  myMap.geoObjects.add(placemark);

  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  //myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

}