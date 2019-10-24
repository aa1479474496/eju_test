interface searchFunc {
    (source: string, substring: string): boolean;
}

let mySearch: searchFunc;
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}
console.log(mySearch('abcdefg', 'defg'));

// class
class Gretter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "hello," + this.greeting; 
    }
}

let greeter = new Gretter("world"); 


class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    } 
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();


