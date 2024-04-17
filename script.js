'use strict';

let title, screens, screenPrice, adaptive, allServicePrices, fullPrice, servicePercentPrice, service1, service2;
let rollback = 30;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num.trim() === num;
};

const asking = function () {
  title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?', 15000);
  } while (!isNumber(screenPrice));

  adaptive = confirm('Нужен ли адаптив на сайте');
};

const getAllServicePrices = function () {
  let sum = 0;
  let price;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    do {
      price = prompt('Сколько это будет стоить?');
    } while (!isNumber(price));

    sum += +price;
  }

  return sum;
};

function getFullPrice(screenPrice, allServicePrices) {
  return +screenPrice + allServicePrices;
}

const getTitle = (str) => {
  const title = str.trim().toLowerCase();
  return title[0].toUpperCase() + title.substr(1);
};

const getServicePercentPrices = function () {
  Math.ceil(fullPrice * (1 - rollback / 100));
};

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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(title);
console.log(screens.toLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrices());
