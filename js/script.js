'use strict';

const title = document.getElementsByTagName('h1')[0];
const btn = document.getElementsByClassName('handler_btn');
const btnCalculate = btn[0];
const btnReset = btn[1];
const btnScreen = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const blockRollbak = document.querySelector('.rollback');
const inputRollbak = blockRollbak.querySelector('input[type=range]');
const rangeValue = blockRollbak.querySelector('.range-value');
const totalInput = document.getElementsByClassName('total-input')[0];
const totalScreens = document.getElementsByClassName('total-input')[1];
const totalCountOhter = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const fullTotalCountWithRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  countScreens: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();

    btnCalculate.addEventListener('click', appData.checkEmptyField);
    btnScreen.addEventListener('click', appData.addScreenBlock);
    inputRollbak.addEventListener('input', appData.addRollback);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // appData.getServicePercentPrices(appData.fullPrice);
    // appData.logger(appData);
    console.log(appData);
    appData.showResult();
  },
  showResult: function () {
    totalInput.value = appData.screenPrice;
    totalScreens.value = appData.countScreens;
    totalCountOhter.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    fullTotalCountWithRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((sreen, index) => {
      const select = sreen.querySelector('select');
      const input = sreen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        nameScreens: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });

      console.log('appData.screens: ', appData.screens);
    });
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    const cloneInput = cloneScreen.querySelector('input');
    cloneInput.value = '';
    screens = document.querySelectorAll('.screen');
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
    console.log('appData: ', appData);
  },
  addRollback: function () {
    rangeValue.textContent = inputRollbak.value + '%';

    appData.rollback = inputRollbak.value;

    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * appData.rollback) / 100;
    fullTotalCountWithRollback.value = appData.servicePercentPrice;

    if (inputRollbak.value > 0 && isNaN(appData.servicePercentPrice)) {
      fullTotalCountWithRollback.value = 0;
    } else {
      fullTotalCountWithRollback.value = appData.servicePercentPrice;
    }
  },
  randoHash: function (i) {
    let rnd = '';
    while (rnd.length < i) {
      rnd += Math.random().toString(36).substring(2);
    }
    return rnd.substring(0, i);
  },
  checkEmptyField: function () {
    let check = true;
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (input.value === '' && select.value === '') {
        check = false;
      }
    });
    if (check) {
      appData.start();
    }
  },
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce((acc, screen) => +acc + +screen.price, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * appData.rollback) / 100;

    appData.countScreens = appData.screens.reduce((acc, screen) => {
      return +acc + +screen.count;
    }, 0);
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

appData.init();
