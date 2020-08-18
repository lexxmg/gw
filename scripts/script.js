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


for (let val of document.body.getElementsByTagName('a')) {
  if ( /полить.*/.test(val.textContent) ) {
    val.append(btn);

    btn.style.left = val.getBoundingClientRect().left + 'px';
    btn.style.top = val.getBoundingClientRect().bottom + 'px';

    console.log(val.textContent);
  }
}

for (let i = 0; i < document.querySelectorAll('tbody')[8].rows.length; i++) {
  for (let j = 0; j < document.querySelectorAll('tbody')[8].rows[i].cells.length; j++) {
    document.querySelectorAll('tbody')[8].rows[i].cells[j].querySelector('a').click();
    //confirm( document.querySelectorAll('tbody')[8].rows[i].cells[j].querySelector('a') );

    for (let val of document.body.getElementsByTagName('a')) {
      if ( /Собрать.*/.test(val.textContent) ) {
        val.appendChild(btn);
        console.log(val.textContent);
        val.click();

      }
    }
  }
}
