// //1
// const user = {
//     name: 'Bob',
//     funcFunc() {
//         return function() {
//             console.log(this);
//         }
//     },
//     funcArrow() {
//         return () => {
//             console.log(this);
//         }
//     },
//     arrowFunc: () => {
//         return function() {
//             console.log(this);
//         }
//     },
//     arrowArrow: () => {
//         return () => {
//             console.log(this);
//         }
//     },
// };
//
// user.funcFunc()(); // global - потому что возвращаемая функция не является методом объекта user.
// user.funcArrow()(); // user - funcArrow возвращает стрелочную функцию, которая унаследует контекст, т.е. вызовется в контексте user.
// user.arrowFunc()(); // global - ArrowFunc - стрелочная функция, следовательно будет ссылаться на глобальный контекст.
// user.arrowArrow()(); // global - arrowArrow - стрелочная функция, которая возвращает другую стрелочную функцию, следовательно this будет ссылаться на глобальный контекст.

// 2
var poke1 = {name:'Pikachu'};
var poke2 = {name:'Chermander'};
var poke3 = {name:'Bulbasaur'};

var sayName = function(){ console.log(this.name) }
// sayName.bind(poke1).bind(poke2).call(poke3); // 'Pikachu' - поскольку привязка контекста выполнится только по первому bind.


// 3
const obj = {
    firstName: 'Bill',
    lastName: 'Ivanov',

    showFirstName: function () {
        console.log(this.firstName);
    },

    showLastName: () => {
        console.log(this.lastName);
    }
}

// obj.showFirstName(); // Bill -> this.firstName  контексте obj.
// obj.showLastName(); // undefined -> showLastName - стрелочная фунцкия, ссылается на глобальный контекст.
//
// obj.showFirstName.bind({ firstName: 'Boris' })(); // Boris -> Привязываем контекст при помощи bind.
// obj.showFirstName.bind({ firstName: 'Boris' }).bind({ firstName: 'Oleg' })(); // Boris -> привязываем контекст при помощи bind, привязывается только после первого bind.
//
// obj.showLastName.bind({ lastName: 'Boris' })(); // undefined -> Для стрелочной функции нельзя привязать контекст подобным образом.

// 4

// const user = {
//     name: 'Mike',
//     fn: function () {
//         console.log(this.name)
//     }
// }
//
// setTimeout(user.fn, 1000)
//
// const user2 = {
//     name: 'Mike',
//     fn: function () {
//         console.log(this.name)
//     }
// }
//
// setTimeout(user2.fn.bind(user2), 1000)

// Что будет выведено в консоль после истечения таймаута и почему? // undefined -> произойдет потеря контекста
// Сделайте так, чтоб починить и выводило "Mike"

// Подсказка - ответ найдете в 5 ссылке README

// 5
//Исправьте cтроку(***), чтобы всё работало (других строк изменять не надо, кроме password, чтобы проверить if else).

function askPassword(ok, fail) {
  let password = 'rockstar2'
  if (password == "rockstar") ok();
  else fail();
}

let user3 = {
  name: 'Вася',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

askPassword(user3.loginOk.bind(user3), user3.loginFail.bind(user3)) //***;



