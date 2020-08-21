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

let btn = document.createElement('button');
btn.textContent = 'кнопка';
btn.style.cssText = 'width: 200px; height: 50px; position: absolute; z-index: 100';
document.body.append(btn);

const pad = +window.getComputedStyle( document.querySelectorAll('table')[5].rows[0].cells[1] ).paddingTop.substr(0, 1);
(btn.style.top = document.querySelectorAll('tbody')[5].rows[0].cells[1].getBoundingClientRect().top + pad) + 'px';
btn.style.left = document.querySelectorAll('tbody')[5].rows[0].cells[1].getBoundingClientRect().right + 'px';


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

const clickElement = createClickTable();

btn.addEventListener('click', function(){
  clickElement();

  console.log('click');
  setTimeout(function(){
    let el = findElement('Собрать урожай');
    if (el) {
      el.click();
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
