'use strict';


// for (let val of document.body.querySelectorAll('a')) {
//   if ( /Отремонтировать.*/.test(val.textContent) ) {
//     confirm = true;
//     val.click();
//
//     for (let val of document.body.querySelectorAll('a')) {
//       if ( /Левая.*/.test(val.textContent) ) {
//         val.click();
//       }
//     }
//   }
// }

for (let i = 0; i < document.querySelectorAll('tbody')[8].rows.length; i++) {
  for (let j = 0; j < document.querySelectorAll('tbody')[8].rows[i].cells.length; j++) {
    document.querySelectorAll('tbody')[8].rows[i].cells[j].querySelector('a').click();
    //confirm( document.querySelectorAll('tbody')[8].rows[i].cells[j].querySelector('a') );

    for (let val of document.body.getElementsByTagName('a')) {
      if ( /Полить.*/.test(val.textContent) ) {
        console.log(val.textContent);
        val.click();
      }
    }
  }
}
