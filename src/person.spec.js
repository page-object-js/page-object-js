"use strict";
var test = require("tape");
var person_1 = require("./person");
test("Person", function (t) {
    t.test("welcome()", function (t) {
        t.plan(1);
        var person = new person_1.Person("Barney", "Rubble");
        t.equal(person.welcome(), "Hello, my name is Barney Rubble");
    });
});
