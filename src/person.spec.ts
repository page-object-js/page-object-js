import test = require("tape");

import {Person} from "./person"


test("Person", function (t) {

    t.test("welcome()", function (t) {
        t.plan(1);

        let person = new Person("Barney", "Rubble");

        t.equal(person.welcome(),
                "Hello, my name is Barney Rubble");

    });
});
