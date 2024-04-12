let title = 'glo';
let screens = 'Simple, Complex, Interactive';
let screenPrice = 400;
let rollback = 30;
let fullPrice = 70000;
let adaptive = false;

console.log('title: ', typeof title);
console.log('fullPrice: ', typeof fullPrice);
console.log('adaptive: ', typeof adaptive);

console.log('screens.length', screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.toLowerCase().split(', '));

console.log('Percent: ', fullPrice * (rollback / 100));
