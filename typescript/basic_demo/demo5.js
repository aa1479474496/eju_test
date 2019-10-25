// 构造函数
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter;
greeter = new Greeter("world");
console.log(greeter.greet());
var Greeter2 = /** @class */ (function () {
    function Greeter2() {
    }
    Greeter2.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter2.standardGreeting;
        }
    };
    Greeter2.standardGreeting = "Hello, there";
    return Greeter2;
}());
var greeter2;
greeter2 = new Greeter2();
console.log(greeter2.greet());
var greeterMaker = Greeter2;
greeterMaker.standardGreeting = "is there";
var greeter3 = new greeterMaker();
console.log(greeter3.greet());
