var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// class
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('woof');
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
var Animal2 = /** @class */ (function () {
    function Animal2(theName) {
        this.name = theName;
    }
    Animal2.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal2;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal2));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal2));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
// 公共，私有与受保护的修饰符
var Animal3 = /** @class */ (function () {
    function Animal3(theName) {
        this.name = theName;
    }
    Animal3.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal3;
}());
var Animal4 = /** @class */ (function () {
    function Animal4(theName) {
        this.name = theName;
    }
    return Animal4;
}());
//  new Animal4("Cat").name;  // error
var Animal5 = /** @class */ (function () {
    function Animal5(theName) {
        this.name = theName;
    }
    return Animal5;
}());
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, "Rhino") || this;
    }
    return Rhino;
}(Animal5));
var Employee = /** @class */ (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal5 = new Animal5("Goat");
var rhino = new Rhino();
var employee = new Employee("Bob");
animal5 = rhino;
// animal5 = employee; // error
// protected
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee2 = /** @class */ (function (_super) {
    __extends(Employee2, _super);
    function Employee2(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee2.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    Employee2.prototype.getName = function () {
        return this.name;
    };
    return Employee2;
}(Person));
var howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.getName());
// console.log(howard.name); // error
var Person3 = /** @class */ (function () {
    function Person3(theName) {
        this.name = theName;
    }
    return Person3;
}());
var Employee3 = /** @class */ (function (_super) {
    __extends(Employee3, _super);
    function Employee3(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee3.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee3;
}(Person3));
var howard3 = new Employee3("Howard", "Sales");
//  let john3 = new Person3("John"); // error
// readonly
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man");
// dad.name = "Man in "; // error
var Octopus2 = /** @class */ (function () {
    function Octopus2(name) {
        this.name = name;
        this.numberOfLegs = 8;
    }
    return Octopus2;
}());
// 存取器
var passCode = "passCode1";
var Employee4 = /** @class */ (function () {
    function Employee4() {
    }
    Object.defineProperty(Employee4.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passCode && passCode == "passCode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee4;
}());
var employee4 = new Employee4();
// console.log('employee4', employee4.fullName)
employee4.fullName = "Bob";
if (employee4.fullName) {
    console.log('employee4', employee4.fullName);
}
