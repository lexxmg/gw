'use strict';

const fermContainer = main_ferma_window,
      fermInner = fermContainer.getElementsByTagName('table')[0],
      fermTable = fermContainer.getElementsByTagName('table')[3],
      fermControlTable = fermContainer.getElementsByTagName('table')[6],
      coordsFerm = fermInner.getBoundingClientRect(),
      btnContainer = document.createElement('div'),
      btn = document.createElement('button'),
      btnPour = document.createElement('button'),
      btnTest = document.createElement('button');

const styleBtn = `display: block;
                  width: 200px;
                  height: 50px;
                  background-color: #CAEBCA;
                  border: 1px;
                  border-style: solid;
                  border-color: #CAEBCA;
                  color: #8E0002;
                  font-size: 16px;
                  font-weight: 500;
                  cursor: pointer;
                 `;


btnContainer.style.position = 'absolute';
btnContainer.style.zIndex = 100;
btnContainer.style.top = (coordsFerm.top + pageYOffset + 3) + 'px';
btnContainer.style.left = (coordsFerm.right + pageXOffset) + 'px';

document.body.append(btnContainer);

btn.style.cssText = styleBtn;
btn.innerHTML = 'Собрать';
btnContainer.append(btn);

btnPour.innerHTML = 'Полить';
btnPour.style.cssText = styleBtn;
btnPour.style.marginTop = '3px';
btnContainer.append(btnPour);

btnTest.innerHTML = 'тесет promise';
btnTest.style.cssText = styleBtn;
btnTest.style.marginTop = '3px';
btnContainer.append(btnTest);

btnContainer.addEventListener('mouseover', (event) => {
  let target = event.target;

  if ( target.matches('BUTTON') ) {
    target.style.backgroundColor = '#DCEBDC';
    target.style.color = 'black';
  }
});

btnTest.addEventListener('click', () => {
  const click = clickCells();

  findIntervalAnchor('Собрать урожай')
    .then(el => {
      console.log(el);
      //clickCells();
      el.click();
      if (click) btnTest.click();
    })
    .catch(err => {
      console.log(err);
      //clickCells();
      //if (click) btnTest.click();
    });

});

btnContainer.addEventListener('mouseout', (event) => {
  let target = event.target;

  if ( target.matches('BUTTON') ) {
    target.style.backgroundColor = '#CAEBCA';
    target.style.color = '#8E0002';
  }
});

const enumerationCell = makeEnumerationCell(fermTable);

btn.addEventListener('click', () => {
  autoCollect();
  //selectPlant();
});

btnPour.addEventListener('click', () => {
  autoWatering();
});

function autoWatering() {
  const click = clickCells();

  if (click) {
    setTimeout(() => {
      watering();
      setTimeout(() => {
        autoWatering();
      }, 200);
    }, 200);
  } else {
    return;
  }
}

function autoCollect() {
  const click = clickCells();

  if (click) {
    setTimeout(() => {
      collect();
      setTimeout(() => {
        selectPlant();
        setTimeout(() => {
          autoCollect();
        }, 200);
      }, 200);
    }, 200);
  } else {
    return;
  }
}

function watering() {
  if ( findBot('Ворота фермы закрыты') ) {
    console.log('Защита от робота');
  } else {
    const el = findElement('Полить');
    if (el) {
      el.click();
      return true;
    } else {
      return false;
    }
  }
}

function collect() {
  if ( findBot('Ворота фермы закрыты') ) {
    console.log('Защита от робота');
  } else {
    const el = findElement('Собрать урожай');
    if (el) {
      el.click();
      return true;
    } else {
      return false;
    }
  }
}

function selectPlant() {
  if ( findBot('Ворота фермы закрыты') ) {
    console.log('Защита от робота');
  } else {
    const poganka = document.getElementById('btn_poganka');
    const findBtn = document.getElementsByClassName('mainbutton')[2];

    if (poganka && poganka.checked) {
      findBtn.click();
    } else if (poganka) {
      poganka.checked = true;
      findBtn.click();
    }
  }
}

function makeEnumerationCell(table) {
  let row = 0;
  let cell = 0;
  const countRows = table.rows.length;
  const countCells = table.rows[row].cells.length;

  return function() {
    if (row < countRows) {
      const obj = table.rows[row].cells[cell];
      cell++;

      if (cell === countCells) {
        cell = 0;
        row++;
      }

      return obj;
    } else {
      row = 0;
      return false;
    }
  }
}

function clickCells() {
  if ( findBot('Ворота фермы закрыты') ) {
    console.log('Защита от робота');
  } else {
    const cell = enumerationCell();

    if (cell) {
      cell.firstChild.click();
      return true;
    } else {
      return false;
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
  return false;
}

function findElement(text) {
  let reg = new RegExp(text + '.*');

  for (let val of document.body.getElementsByTagName('a')) {
    if ( reg.test(val.textContent) ) {
      return val;
    }
  }
  return false;
}

//findIntervalAnchor('Собрать урожай').then(() => console.log('ok')).catch(() => console.log('err'))

function findIntervalAnchor(text) {
  let clickTimerIntervalId;
  let count = 0;

  return new Promise(function(resolve, reject) {
    clickTimerIntervalId = setInterval(() => {
     count++;
     for (let el of document.querySelectorAll('a') ) {
        if (el.textContent === text) {
          //el.click();
          clearTimeout(clickTimerIntervalId);
          resolve(el);
        }
      }
      if (count === 200) {
        clearTimeout(clickTimerIntervalId);
        reject('время вышло');
      }
    }, 50);
  });
}
