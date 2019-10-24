function greeter(person) {
    return "hello, " + person;
}
var user = 'user';
document.getElementById('test').innerHTML = greeter(user);
function greeter1(person) {
    return "hello, " + person.firstName + "  " + person.lastName;
}
var user1 = {
    firstName: 'test1FirstName',
    lastName: 'test1LastName'
};
document.getElementById('test1').innerHTML = greeter1(user1);
// class
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + "  " + middleInitial + "  " + lastName;
    }
    return Student;
}());
var user2 = new Student("Jane", "M.", "User");
document.getElementById('test2').innerHTML = greeter1(user2) + user2.fullName;
console.log('user2', user2);
