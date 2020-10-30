// function identity1<T>(arg: T): T {
//   return arg;
// }
var Type1Class = /** @class */ (function () {
    function Type1Class() {
    }
    Type1Class.prototype.func1 = function () {
        console.log('func1 run');
    };
    Type1Class.prototype.func2 = function () {
        console.log('func2 run');
    };
    return Type1Class;
}());
var Type2Class = /** @class */ (function () {
    function Type2Class() {
    }
    Type2Class.prototype.func3 = function () {
        console.log('func3 run');
    };
    Type2Class.prototype.func2 = function () {
        console.log('func2 run');
    };
    return Type2Class;
}());
function getSomeType(type) {
    if (type == '1') {
        return new Type1Class();
    }
    if (type == '2') {
        return new Type2Class();
    }
}
// 如果一个值的类型是 A | B，我们能够 确定的是它包含了 A 和 B中共有的成员。 这个例子里， Type1Class具有一个func1成员。 我们不能确定一个 Type1Class | Type2Class类型的变量是否有func1方法。 如果变量在运行时是Type1Class类型，那么调用type.func1()就出错了。
var type = getSomeType('1');
type.func2();
// type.func1(); // error
