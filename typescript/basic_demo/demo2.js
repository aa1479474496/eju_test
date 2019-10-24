var isDone = false;
var decLiteral = 6;
var octalLiteral = 484;
var nickName = 'bob';
var age = 17;
var sentence = "Hello, my name is " + nickName + ". I will be " + (age + 1) + " years old next month!";
var test = age - 1;
var list = [1, 2, 3];
var list2 = [1, 2, 3]; // 泛型
// 元组 tuple
var x;
x = ['hello', 10];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 2] = "Red";
    Color2[Color2["Green"] = 3] = "Green";
    Color2[Color2["Blue"] = 4] = "Blue";
})(Color2 || (Color2 = {}));
;
var c2 = Color2.Green;
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 4] = "Blue";
})(Color3 || (Color3 = {}));
;
var c3 = Color3.Green;
var colorName = Color3[2]; // 知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字
console.log(c3);
console.log(colorName);
// any
var notSure = 4;
notSure = 'maybe a string instead';
notSure = false;
var listAny = [1, true, 'list'];
listAny[1] = 'any';
console.log(listAny);
// void
function warnUser() {
    console.log('This is my warning message!');
}
warnUser();
// 接口
function printLabel(labelObj) {
    console.log(labelObj.label);
}
var myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
var myObj2 = { size: 9, label: '12' };
printLabel(myObj2);
function createSqure(config) {
    var newSqure = { color: 'white', area: 100 };
    if (config.color) {
        newSqure.color = config.color;
    }
    if (config.width) {
        newSqure.area = config.width * config.width;
    }
    return newSqure;
}
var mySqure = createSqure({ color: 'black' });
console.log('squre', mySqure);
