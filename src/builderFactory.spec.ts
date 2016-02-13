import * as test from  "tape";
import {on} from "./builderFactory";
class SamplePage {

}
test("on()",  function (t: test.Test):void {
    t.test("returns an instance", function (t: test.Test):void {
        t.plan(1);
        let result:SamplePage = on(SamplePage);
        t.notEqual(result, undefined);
    });
});
