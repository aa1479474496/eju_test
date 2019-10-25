// 可选参数和默认参数
function buildName1(firstName, lastName) {
    return firstName + "  " + lastName;
}
// let result11 = buildName1("bob"); // error
// let result12 = buildName1("Bod", "Admas", "sss");// error
// let result13 = buildName1("Bob", "Adams");
function buildName2(firstName, lastName) {
    if (lastName) {
        return firstName + "  " + lastName;
    }
    return firstName;
}
// let result21 = buildName2("bob");
// let result22 = buildName2("Bod", "Admas", "sr"); //error
// let result23 = buildName2("Bod", "Admas");
//剩余参数
function buildName3(firstName) {
    var restOfName = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restOfName[_i - 1] = arguments[_i];
    }
    return firstName + ' ' + restOfName.join(' ');
}
var result31 = buildName3('a', 'b', 'c', 'd');
console.log(result31);
