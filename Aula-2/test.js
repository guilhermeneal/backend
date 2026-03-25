var obj= {};
var person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    id: 12345,
    friends: [26296, 26297, 26298],
    address: {
        street: "123 Main St",
        city: "Anytown",
        postalCode: "12345"
    },
    greeting: function() {
        return "Hello, " + this.firstName + " " + this.lastName + "!";
    }
}
person.height = 175;
var id = person.id;
console.log(person.greeting());
