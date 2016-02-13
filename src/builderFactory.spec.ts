import * as test from  "tape";
import {on} from "./builderFactory";
import {Promise} from 'es6-promise';

abstract class Page {
    public then(): Promise<any> {
        return Promise.resolve(null)
    }
}

import {Button} from './button';
class SamplePage extends Page {
    public submit: Button = new Button({id: 'submit'});
}

test("on()",  function (t: test.Test):void {
    t.test("returns an instance of the page", function (t: test.Test):void {
        t.plan(1);
        let result:SamplePage = on(SamplePage);
        t.notEqual(result, undefined);
        t.notEqual(result, null);
    });
    t.test("actions return the page instance", function (t: test.Test):void {
        t.plan(0);  // <== The fact that this test compiles is good enough.
        let result:SamplePage = on(SamplePage).submit.visible();
    });
});
