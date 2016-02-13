import * as test from  "tape";
import {on} from "./builderFactory";
import {Page} from "./page";


import {Button} from "./button";
class SamplePage extends Page {
    public submit: Button = new Button({id: "submit"});
}

test("on()",  function (t: test.Test):void {
    t.test("returns an instance of the page", function (t: test.Test):void {
        t.plan(2);
        let result:SamplePage = on(SamplePage);
        t.notEqual(result, undefined);
        t.notEqual(result, null);
    });
    // This test doesn't really belong here, move it later.
    t.test("actions return the page instance", function (t: test.Test):void {
        t.plan(1);
        let result:SamplePage = on(SamplePage).submit.visible();
        t.true(result instanceof SamplePage);
    });
});
