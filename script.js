'use strict';

let title = prompt('Как называется ваш проект?'),
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
  screenPrice = +prompt('Сколько будет стоить данная работа?', '12000'),
  rollback = 30,
  adaptive = confirm('Нужен ли адаптив на сайте'),
  service1 = prompt('Какой дополнительный тип услуги нужен?'),
  servicePrice1 = +prompt('Сколько это будет стоить?'),
  service2 = prompt('Какой дополнительный тип услуги нужен?'),
  servicePrice2 = +prompt('Сколько это будет стоить?');

const getAllServicePrices = function (price1, price2) {
  return price1 + price2;
};

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice(screenPrice, allServicePrices) {
  return screenPrice + allServicePrices;
}

const fullPrice = getFullPrice(screenPrice, allServicePrices);

const getTitle = (str) => {
  const title = str.trim().toLowerCase();
  return title[0].toUpperCase() + title.substr(1);
};

title = getTitle(title);

const getServicePercentPrices = function () {
  Math.ceil(fullPrice * (1 - rollback / 100));
};

const servicePercentPrice = getServicePercentPrices();

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
  if (price > 30000) {
    return 'Даем скидку в 10%';
  } else if (15000 <= price && price <= 30000) {
    return 'Даем скидку в 5%';
  } else if (0 <= price && price < 15000) {
    return 'Скидка не предусмотрена';
  } else {
    return 'Что то пошло не так';
  }
};

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(title);
console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());
