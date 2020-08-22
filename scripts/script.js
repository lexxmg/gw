'use strict';


for (let val of document.body.querySelectorAll('a')) {
  if ( /Отремонтировать.*/.test(val.textContent) ) {
    confirm = true;
    val.click();

    for (let val of document.body.querySelectorAll('a')) {
      if ( /Левая.*/.test(val.textContent) ) {
        val.click();
      }
    }
  }
}

const positionTop = document.querySelector('#main_ferma_window table').offsetTop;
const positionLeft = document.querySelector('#main_ferma_window table').offsetLeft;
const width = document.querySelector('#main_ferma_window table').offsetWidth;

const btnContainer = document.createElement('div');
btnContainer.style.cssText = 'position: absolute;';
document.body.append(btnContainer);
btnContainer.style.top = (positionTop + 3) + 'px';
btnContainer.style.left = (positionLeft + width) + 'px';

const btn = document.createElement('button');
btn.textContent = 'кнопка';
btn.style.cssText = 'display: block; width: 200px; height: 50px;';
btnContainer.append(btn);

const btnPlant = document.createElement('button');
btnPlant.textContent = 'Посадить';
btnPlant.style.cssText = 'display: block; width: 200px; height: 50px; margin-top: 10px';
btnContainer.append(btnPlant);

// const pad = +window.getComputedStyle( document.querySelectorAll('table')[5].rows[0].cells[1] ).paddingTop.substr(0, 1);
// (btn.style.top = document.querySelectorAll('tbody')[5].rows[0].cells[1].getBoundingClientRect().top + pad) + 'px';
// btn.style.left = document.querySelectorAll('tbody')[5].rows[0].cells[1].getBoundingClientRect().right + 'px';


// for (let val of document.body.getElementsByTagName('a')) {
//   if ( /полить.*/.test(val.textContent) ) {
//     val.append(btn);
//
//     btn.style.left = val.getBoundingClientRect().left + 'px';
//     btn.style.top = val.getBoundingClientRect().bottom + 'px';
//
//     console.log(val.textContent);
//   }
// }
//document.getElementById("btn_poganka").checked=true;
//document.getElementsByClassName('mainbutton')[2].click();
const clickElement = createClickTable();

btnPlant.addEventListener('click', function() {
  const poganka = document.getElementById('btn_poganka');
  const findBtn = document.getElementsByClassName('mainbutton')[2];

  if (poganka && poganka.checked) {
    findBtn.click();
  } else if (poganka) {
    poganka.click();
    setTimeout(() => btnPlant.click(), 300);
  }
});

btn.addEventListener('click', function() {
  let ret = clickElement();

  console.log('click' + ' ' + ret);
  setTimeout(function(){
    if ( findBot('Нажмите') ) {
      console.log('Защита от робота' + ' ' + 'STOP!!');
    } else {
      let el = findElement('Собрать урожай');
      let elP = findElement('Полить');

      if (el) {
        el.click();
      }

      if (elP) {
        elP.click();
      }

      setTimeout(() => btnPlant.click(), 300);

      let idTime = setTimeout(() => {
        if (ret) {
          clearTimeout(idTime);
        } else {
          btn.click();
        }
      }, 1000);
    }
  }, 300);
});

function createClickTable() {
  let i = 0;
  let j = 0;
  const rows = document.querySelectorAll('tbody')[8].rows.length;
  const cells = document.querySelectorAll('tbody')[8].rows[i].cells.length;

  return function() {
    document.getElementsByTagName('tbody')[8].rows[i].cells[j].getElementsByTagName('a')[0].click();
    j++;

    if (j === cells) {
      j = 0;
      i++;
    }

    if (i === rows) {
      j = 0;
      i = 0;
      return true;
    }
  }
}

function findBot(text) {
  let reg = new RegExp(text + '.*');

  for (let val of document.body.getElementsByTagName('td')) {
    if ( reg.test(val.textContent) ) {
      return true;
    }
  }
}

function findElement(text) {
  let reg = new RegExp(text + '.*');

  for (let val of document.body.getElementsByTagName('a')) {
    if ( reg.test(val.textContent) ) {
      return val;
    }
  }
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
