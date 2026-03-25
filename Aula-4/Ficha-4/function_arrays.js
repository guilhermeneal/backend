var array = [];

array.push(function () {
  console.log("Hello" + " " + "World 1");
});
array.push(function () {
  console.log("2");
});
array.push(function () {
  console.log("3");
});

for (var i = 0; i < array.length; i++) {
  array[i]();
}

array.forEach(function (func) {
  func();
});

// exercicio 5//

var events = require("./config.js");
var EventEmitter = require("events");
var emitter = new EventEmitter();
emitter.on(events.USER_LOGIN, function () {
  console.log("O utilizador fez login.");
});
emitter.on(events.ITEM_ADDED, function () {
  console.log("Um item foi adicionado.");
});
emitter.emit(events.USER_LOGIN);
emitter.emit(events.ITEM_ADDED);
