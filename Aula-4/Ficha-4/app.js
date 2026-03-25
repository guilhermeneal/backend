var person = {
  name: "Tiago",
  age: 30,
  gender: "male"
};

var jsonString = JSON.stringify(person);
console.log(jsonString);


var jsonString = '{"name":"Tiago","age":30,"gender":"male"}'

var personObject = JSON.parse(jsonString);
console.log(personObject);  





