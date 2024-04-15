'use strict';

const title = prompt('Как называется ваш проект?'),
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
  screenPrice = +prompt('Сколько будет стоить данная работа?', '12000'),
  rollback = 30,
  adaptive = confirm('Нужен ли адаптив на сайте'),
  service1 = prompt('Какой дополнительный тип услуги нужен?'),
  servicePrice1 = +prompt('Сколько это будет стоить?'),
  service2 = prompt('Какой дополнительный тип услуги нужен?'),
  servicePrice2 = +prompt('Сколько это будет стоить?'),
  fullPrice = screenPrice + servicePrice1 + servicePrice2,
  servicePercentPrice = Math.ceil(fullPrice * (1 - rollback / 100));
console.log('servicePercentPrice: ', servicePercentPrice);

console.log('title: ', typeof title);
console.log('fullPrice: ', typeof fullPrice);
console.log('adaptive: ', typeof adaptive);

console.log('screens.length', screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.toLowerCase().split(', '));

console.log('Percent: ', fullPrice * (1 - rollback / 100));

switch (true) {
  case fullPrice > 30000:
    console.log('Даем скидку в 10%');
    break;
  case 15000 <= fullPrice && fullPrice <= 30000:
    console.log('Даем скидку в 5%');
    break;
  case 0 <= fullPrice && fullPrice < 15000:
    console.log('Скидка не предусмотрена');
    break;
  default:
    console.log('Что то пошло не так');
}
