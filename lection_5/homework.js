//1.
const a = {b: 1},
    c = Object.create(a);

// console.log(c.b); // 1 - Создан объект 'c' на основе объекта 'а', по цепочке находит свойство в прототипе
// // delete c.b;
// console.log(c.b); // 1 - У 'c' нет собственного свойства 'b', поэтому delete c.b ни на что не повлияет
// delete a.b;
// console.log(c.b); // undefined - поскольку удалили свойство у прототипа, на основании которого объявлено 'c'
// a.z = 2;
// console.log(c.z); // 2 - свойство задано у 'a', которое является прототипом 'c'
// c.z = 3;
// console.log(a.z); // 2 - z изменили у объекта 'c', но не у прототипа

// 2.

const promise = new Promise(() => {
})
// console.log(promise.prototype === Promise.__proto__) // false;  promise.__proto__ === Promise.prototype -> true

const obj = {}

// console.log(obj.__proto__ === Object.prototype) // true
// console.log(new Array([]).__proto__ === Array.prototype) // true

// function Fn1 () {}
// function Fn2 () {}
// console.log(Fn1.constructor === Fn2.constructor) // true, один и тот же конструктор - Function
// console.log(Fn1.prototype === Fn2.prototype )// false, поскольку объект prototype создается для каждой функции свой
//3.

// У вас есть два конструктора, Animal и Bird.
// Каждый объект типа Bird должен наследовать метод speak от Animal.
// Однако, Bird также должен иметь свой собственный метод fly.

// Создайте функцию-конструктор Animal, который принимает параметр name и устанавливает его как свойство объекта.
// Добавьте метод speak в Animal, который выводит в консоль звук, издаваемый животным (например, "Some generic sound").
// Создайте конструктор Bird, который принимает параметр name и вызывает конструктор Animal с тем же именем.
// Добавьте метод fly в Bird, который выводит в консоль сообщение о том, что птица летит (например, "Flying high!").
// Создайте объекты animal и bird с использованием соответствующих конструкторов и вызовите их методы speak и fly.
// Решите задачу, используя прототипное наследование, чтобы Bird наследовал от Animal.

// Должно быть такое поведение:
// const animal = new Animal("Дженни");
// const bird = new Bird("Воробей");
//
// animal.speak(); // "Some generic sound"
// bird.speak();   // "Some generic sound"
// bird.fly();     // "Flying high!"

////////////////////////////////////
///////////  на классах ////////////
////////////////////////////////////

// class Animal {
//     constructor(name) {
//         this.name = name
//     }
//     speak() {
//         console.log('Some generic sound')
//     }
// }
// class Bird extends Animal{
//     constructor() {
//         super();
//     }
//     fly(){
//         console.log('Flying high!')
//     }
// }
//
//
// const animal = new Animal("Дженни")
// const bird = new Bird("Воробей")
//
// animal.speak()
// bird.speak()
// bird.fly()


///////////////////////////////////////////
///////// Функция конструктор /////////////
///////// через call /////////
///////////////////////////////////////////
function Animal(name){
    this.name = name
    this.speak = function(){
        console.log('Some generic speak!')
    }
}
function Bird(name){
    Animal.call(this, name)
    this.fly = function () {
        console.log('Flying high')
    }
}
Bird.prototype.constructor = Bird

const animal = new Animal("Дженни")
const bird = new Bird("Воробей")

animal.speak()
bird.speak()
bird.fly()
