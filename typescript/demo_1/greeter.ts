
function greeter(person: string) {
    return "hello, " + person;
}

let user = 'user';
document.getElementById('test').innerHTML = greeter(user);


// interface
interface Person {
    firstName: string;
    lastName: string;
}

function greeter1(person: Person) {
    return "hello, " + person.firstName + "  " + person.lastName;
}
let user1 = {
    firstName: 'test1FirstName',
    lastName: 'test1LastName'
}
document.getElementById('test1').innerHTML = greeter1(user1);

// class
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + "  " + middleInitial + "  " + lastName;
    }
}

let user2 = new Student("Jane", "M.", "User");
document.getElementById('test2').innerHTML = greeter1(user2) + user2.fullName;
console.log('user2', user2);

// 