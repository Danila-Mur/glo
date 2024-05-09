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
const fullTotalCountWithRollback = document.getElementsByClassName('total-input')[4],
  cmsOpen = document.querySelector('#cms-open'),
  hiddenCmsVariants = document.querySelector('.hidden-cms-variants'),
  cmsSelect = document.querySelector('#cms-select'),
  percentCmsInput = hiddenCmsVariants.querySelector('.main-controls__input'),
  cmsOtherInput = document.querySelector('#cms-other-input');

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
  cmsPrice: 0,
  init: function () {
    this.addTitle();

    btnCalculate.addEventListener('click', this.checkEmptyField.bind(this));
    btnScreen.addEventListener('click', this.addScreenBlock);
    inputRollbak.addEventListener('input', this.addRollback.bind(this));
    btnReset.addEventListener('click', this.reset.bind(this));
    cmsOpen.addEventListener('click', this.showCms);
    cmsSelect.addEventListener('change', this.selectCms);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.selectCms();
    this.addPrices();
    this.logger();
    this.showResult();
    this.blockInterface();
  },
  reset: function () {
    this.removeScreens();
    this.removeServices();
    this.addPrices();
    this.removeRollback();
    this.showResult();
    this.logger();
    this.hiddenCms();
    this.unblockInterface();
  },
  showResult: function () {
    totalInput.value = this.screenPrice;
    totalScreens.value = this.countScreens;
    totalCountOhter.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    fullTotalCountWithRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen');

    screens.forEach((sreen, index) => {
      const select = sreen.querySelector('select');
      const input = sreen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        nameScreens: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
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
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addRollback: function () {
    rangeValue.textContent = inputRollbak.value + '%';

    this.rollback = inputRollbak.value;

    this.servicePercentPrice = this.fullPrice - (this.fullPrice * this.rollback) / 100;
    fullTotalCountWithRollback.value = this.servicePercentPrice;

    if (inputRollbak.value > 0 && isNaN(this.servicePercentPrice)) {
      fullTotalCountWithRollback.value = 0;
    } else {
      fullTotalCountWithRollback.value = this.servicePercentPrice;
    }
  },
  checkEmptyField: function () {
    let check = true;
    screens = document.querySelectorAll('.screen');

    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      if (input.value === '' && select.value === '') {
        check = false;
      }
    });
    if (check) {
      this.start();
    }
  },
  addPrices: function () {
    this.screenPrice = this.screens.reduce((acc, screen) => +acc + +screen.price, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice = this.fullPrice - (this.fullPrice * this.rollback) / 100;

    this.countScreens = this.screens.reduce((acc, screen) => {
      return +acc + +screen.count;
    }, 0);
  },
  showCms: function () {
    if (cmsOpen.checked) {
      hiddenCmsVariants.style.display = 'flex';
    } else {
      hiddenCmsVariants.style.display = 'none';
      cmsSelect.value = '';
    }
  },
  selectCms: function () {
    if (cmsSelect.value === 'other') {
      percentCmsInput.style.display = 'flex';
      this.cmsPrice = cmsOtherInput.value;
    } else if (cmsSelect.value === '50') {
      this.cmsPrice = 50;
      percentCmsInput.style.display = 'none';
    }
  },
  blockInterface: function () {
    screens.forEach((item) => {
      const select = item.querySelector('select');
      const input = item.querySelector('input');

      input.disabled = true;
      select.disabled = true;
    });

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = true;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = true;
    });

    btnCalculate.style.display = 'none';
    btnReset.style.display = 'block';

    cmsOpen.disabled = true;
    cmsSelect.disabled = true;
    cmsOtherInput.disabled = true;
  },
  removeScreens: function () {
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');

      select.value = '';
      input.value = '';

      if (index !== 0) {
        screen.remove();
      }
    });

    this.screens = [];
  },
  removeServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      if (check.checked) {
        check.checked = false;
      }
    });

    this.servicesPercent = {};
    this.servicesNumber = {};
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
  },
  unblockInterface: function () {
    screens.forEach((item) => {
      const select = item.querySelector('select');
      const input = item.querySelector('input');

      input.disabled = false;
      select.disabled = false;
    });

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = false;
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type = checkbox]');

      check.disabled = false;
    });

    btnCalculate.style.display = 'block';
    btnReset.style.display = 'none';

    cmsOpen.disabled = false;
    cmsSelect.disabled = false;
    cmsOpen.checked = false;
    cmsOtherInput.disabled = false;
  },
  removeRollback: function () {
    this.rollback = 0;
    rangeValue.textContent = 0 + '%';
    this.servicePercentPrice = 0;
    inputRollbak.value = -1;
  },
  hiddenCms: function () {
    this.cmsPrice = 0;
    cmsSelect.value = '';

    hiddenCmsVariants.style.display = 'none';
    percentCmsInput.style.display = 'none';
  },
  logger: function () {
    console.log(this);
  },
};

appData.init();
