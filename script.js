'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 30,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.title = appData.getTitle(appData.title);
    appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice);
    appData.logger(appData);
  },
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?', 15000);
    } while (!appData.isNumber(appData.screenPrice));

    appData.adaptive = confirm('Нужен ли адаптив на сайте');
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num.trim() === num;
  },
  getAllServicePrices: function () {
    let sum = 0;
    let price = 0;

    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
      }

      do {
        price = prompt('Сколько это будет стоить?');
      } while (!appData.isNumber(price));

      sum += +price;
    }

    return sum;
  },
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  getTitle: function (str) {
    const title = str.trim().toLowerCase();
    return title[0].toUpperCase() + title.substr(1);
  },
  getServicePercentPrices: function () {
    return Math.ceil(appData.fullPrice * (1 - appData.rollback / 100));
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
    for (let key in obj) {
      console.log(`Ключ: ${key}, значение: ${obj[key]}`);
    }
  },
};

appData.start();

console.log('appData.fullPrice: ', appData.fullPrice);
console.log('appData.servicePercentPrice: ', appData.servicePercentPrice);
