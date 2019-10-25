// 构造函数
class Greeter {
  greeting: String;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

let greeter: Greeter;
greeter = new Greeter("world");
// console.log(greeter.greet());

class Greeter2 {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return `Hello, ${this.greeting}`;
    } else {
      return Greeter2.standardGreeting;
    }
  }
}
let greeter2: Greeter2;
greeter2 = new Greeter2();
// console.log(greeter2.greet());

let greeterMaker: typeof Greeter2 = Greeter2;

greeterMaker.standardGreeting = "is there";

let greeter3: Greeter2 = new greeterMaker();
// console.log(greeter3.greet());


