// class
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('woof');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();


class Animal2 {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }

    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal2 {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal2 {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal2 = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// 公共，私有与受保护的修饰符
class Animal3 {
    public name: string;
    public constructor(theName: string) {
        this.name = theName;
    }

    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

 class Animal4 {
     private name: string;
     constructor(theName: string) {
         this.name = theName;
     }
 }

//  new Animal4("Cat").name;  // error

class Animal5 {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Rhino extends Animal5 {
    constructor() {
        super("Rhino");
    }
}

class Employee {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

let animal5 = new Animal5("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal5 = rhino;
// animal5 = employee; // error

// protected
class Person {
    protected name:string;
    constructor(name: string) {
        this.name = name;
    }
}

class Employee2 extends Person {
    private department: string;

    constructor(name:string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
    }

    public getName() {
        return this.name;
    }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.getName());
// console.log(howard.name); // error
class Person3 {
    protected name: string;
    protected constructor(theName: string) {
        this.name = theName;
    }
}

class Employee3 extends Person3 {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
 }

 let howard3 = new Employee3("Howard", "Sales");
//  let john3 = new Person3("John"); // error

// readonly
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
}

let dad = new Octopus("Man");
// dad.name = "Man in "; // error

class Octopus2 {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {

    }
}

// 存取器
let passCode = "passCode";
class Employee4 {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passCode && passCode == "passCode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized")
        }
    }
}

let employee4 = new Employee4();
employee4.fullName = "Bob";
if (employee4.fullName) {
    console.log('employee4', employee4.fullName)
}



