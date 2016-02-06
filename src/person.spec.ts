import * as test from  "tape";
import {Person} from "./person";

test("Person",  function (t: test.Test):void {

    t.test("welcome()", function (t: test.Test):void {
        t.plan(1);

        let person:Person = new Person("Barney", "Rubble");

        t.equal(person.welcome(),
                "Hello, my name is Barney Rubble");

    });
});
