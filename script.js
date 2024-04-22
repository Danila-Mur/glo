'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 30,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();

    appData.addPrices();
    appData.getFullPrice();
    appData.getTitle(appData.title);
    appData.getServicePercentPrices(appData.fullPrice);

    appData.logger(appData);
  },
  asking: function () {
    do {
      appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    } while (!appData.isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let nameScreens;
      do {
        nameScreens = prompt('Какие типы экранов нужно разработать?');
      } while (!appData.isString(nameScreens));
      let price = 0;

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, nameScreens, price });
    }

    for (let i = 0; i < 2; i++) {
      let nameService;
      do {
        nameService = prompt('Какой дополнительный тип услуги нужен?');
      } while (!appData.isString(nameService));
      nameService += '_' + appData.randoHash(4);

      let price = 0;

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      appData.services[nameService] = +price;
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте');
  },
  randoHash: function (i) {
    let rnd = '';
    while (rnd.length < i) {
      rnd += Math.random().toString(36).substring(2);
    }
    return rnd.substring(0, i);
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((acc, screen) => +acc + +screen.price, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num.trim() === num;
  },
  isString: function (str) {
    return str.trim() && !appData.isNumber(str);
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + +appData.allServicePrices;
  },
  getTitle: function (str) {
    const title = str.trim().toLowerCase();
    appData.title = title[0].toUpperCase() + title.substr(1);
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice * (1 - appData.rollback / 100));
  },
  getRollbackMessage: function (price) {
    if (price > 30000) {
      return 'Даем скидку в 10%';
    } else if (15000 <= price && price <= 30000) {
      return 'Даем скидку в 5%';
    } else if (0 <= price && price < 15000) {
      return 'Скидка не предусмотрена';
    } else {
      return 'Что то пошло не так';
    }
  },
  logger: function (obj) {
    // for (let key in obj) {
    //   console.log(`Ключ: ${key}, значение: ${obj[key]}`);
    // }

    console.log('appDat.services: ', appData.services);
    console.log('appDat.fullPrice: ', appData.fullPrice);
    console.log('appData.servicePercentPrice: ', appData.servicePercentPrice);
    console.log('appData.allServicePrices: ', appData.allServicePrices);
    console.log('appData.screenPrice: ', appData.screenPrice);
  },
};

appData.start();
