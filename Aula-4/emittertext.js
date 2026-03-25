var Emitter = require("events");
var emtr = new Emitter();

emtr.on("greet", function(name) {
    console.log("Somewhere, someone said hello");
});

emtr.on("login", function(username) {
    console.log("Someone logged ");
});
emtr.emit("login", "John");