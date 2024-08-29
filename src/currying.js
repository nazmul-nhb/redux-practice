function add(a) {
    return function (b) {
        return a + b;
    };
}

console.log(add(1)(4));

const add2 = a => b => a + b;
