// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log('1');

setTimeout(() => console.log('2') , 1);

let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
});

promiseNew.then(() => console.log('4'));

setTimeout(() => console.log('5'));

console.log('6');
//////////////////////////////    в среде Node - 1,3,6,4,2,5  в консоли - 1,3,6,4,5,2 почему? Непонятно
// 2)
let promiseTree = new Promise((resolve , reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
        console.log("2");
    } , 0);
    console.log("3");
});
/////////////////////////  1 3 2
// 3)
let promiseTwo = new Promise((resolve , reject) => {
    resolve("a");
});
promiseTwo
    .then((res) => {
        return res + "b";
    })
    .then((res) => {
        return res + "с";
    })
    .finally((res) => {
        return res + "!!!!!!!";
    })
    .catch((res) => {
        return res + "d";
    })
    .then((res) => {
        console.log(res);
    });
/////////////////////////////  abc (finally не принимает никаких аргументов)
// 4)
function doSmth() {
    return Promise.resolve("123");
}

doSmth()
    .then(function (a) {
        console.log("1" , a); //
        return a;
    })
    .then(function (b) {
        console.log("2" , b);
        return Promise.reject("321");
    })
    .catch(function (err) {
        console.log("3" , err);
    })
    .then(function (c) {
        console.log("4" , c);
        return c;
    });
/////////////////////////// 1 123 2 123 3 321 4 undefined (поскольку catch ничего не возвращает, а только делает log)
// 5)
console.log("1");
setTimeout(function () {
    console.log("2");
} , 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
////////////////////////// 1 4 3 2
// 7)
async function a() {
    console.log("a");
}

console.log("1");

(async function () {
    console.log("f1");
    await a();
    console.log("f2");
})();
console.log("2");
//////////////////////////////// 1 f1 2 a f2 (код после await не отрабатывает до выполнения самого await)
//8)
console.log(1);

setTimeout(() => console.log(2));

async function func() {
    console.log(3);

    await new Promise((resolve) => {
        console.log(4);
        resolve();
        console.log(5);
    })
        .then(() => console.log(6))
        .then(() => console.log(7));

    console.log(8);
}

setTimeout(() => console.log(9));

func();

console.log(10);
/////////////////////////////////// 1 3 4 5 10 6 7 8 2 9 (1,3,4,5 10 - основной поток, 6,7 - микротаски, 2,9 - макротаски)
// 9)*
function foo(callback) {
    setTimeout(() => {
        callback('A');
    } , Math.random() * 100);
}

function bar(callback) {
    setTimeout(() => {
        callback('B');
    } , Math.random() * 100);
}

function baz(callback) {
    setTimeout(() => {
        callback('C');
    } , Math.random() * 100);
}

function orderedCall(arg) {
    return new Promise((resolve) => {
        arg((value) => {
            console.log(value)
            resolve()
        })
    })
}

orderedCall(foo)
    .then(() => orderedCall(bar))
    .then(() => orderedCall(baz))

// foo(console.log)
// bar(console.log)
// baz(console.log)

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))

///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
function resolveAfter2Seconds(x) {
    console.log(`Какой Х пришёл -> ${x}`)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x); //
        } , 5000);
    });
}

async function add1(x) {
    console.log('add1 Hello')
    const a = await resolveAfter2Seconds(20);
    const b = await resolveAfter2Seconds(30);
    console.log('add1 Bye')
    return x + a + b;
}

// add1(10).then(console.log);

// вызываем функцию add1 от 10. В call stack попадает console.log('add1 Hello') и сразу отрабатывает
// присваиваем в 'a' await resolveAfter2Seconds(20).
// console.log(`Какой Х пришёл -> ${x}`) в call stack, сразу отрабатывает и выводит 20
// спустя 5 секунд резолвит х (20)
// const b дожидается выполнения await resolveAfter2Seconds(20)
// В call stack попадает console.log(`Какой Х пришёл -> ${x}`), сразу отрабатывает и выводит 30. Через 5 секунд  резолвит 30.
// console.log('add1 Bye')
// return x + a + b === 10 + 20 + 30 === 60 -> log 60


////// обычное решение
function add2(x) {
    console.log('add2 Hello')
    return new Promise((resolve) => {
        resolve(resolveAfter2Seconds(20))
    }).then((a) => {
        return new Promise((resolve) => {
            resolve(resolveAfter2Seconds(30))
        }).then((b) => {
            console.log('add2 Bye')
            return x + a + b
        })
    })
}

// add2(10).then(console.log);


/// решение с использованием функции-генератора
function* addGenerator(x) {
    const a = yield resolveAfter2Seconds(20);
    const b = yield resolveAfter2Seconds(30);
    return x + a + b;
}

function add3(x) {
    console.log('add3 Hello')
    const generator = addGenerator(x);
    let result = generator.next();

    function handleResult(result) {
        if (result.done) {
            console.log('add3 Bye')
            return Promise.resolve(result.value);
        } else {
            return Promise.resolve(result.value).then(res => {
                return handleResult(generator.next(res));
            });
        }
    }

    return handleResult(result);
}

add3(10).then(console.log);





