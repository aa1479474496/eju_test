// 可选参数和默认参数
function buildName1(firstName: string, lastName: string) {
    return firstName + "  " + lastName;
}
// let result11 = buildName1("bob"); // error
// let result12 = buildName1("Bod", "Admas", "sss");// error
// let result13 = buildName1("Bob", "Adams");

function buildName2(firstName: string, lastName?: string) {
    if (lastName) {
        return `${firstName}  ${lastName}`;
    }
    return firstName;
}
// let result21 = buildName2("bob");
// let result22 = buildName2("Bod", "Admas", "sr"); //error
// let result23 = buildName2("Bod", "Admas");



//剩余参数

function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + ' ' + restOfName.join(' ');
}
let result31 = buildName3('a', 'b', 'c', 'd');
// console.log(result31);


//this和箭头函数
