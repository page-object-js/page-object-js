import * as test from  "tape";
import {on} from "./builderFactoir";
import {Page} from "./page";
import {setBrowser} from "./browser";


import {Button} from "./button";
class SamplePage extends Page {
    public submit: Button = new Button({id: "submit"}, this);
}

test("on()",  function (t: test.Test):void {
    function before(): void {
        const mock: any = {
            isElementPresent(): boolean { return true; },
            controlFlow(): any { return null; },
            schedule(): any { return null; },
            setFileDetector(): any { return null; },
            getSession(): any { return null; },
            getCapabilities(): any { return null; },
            quit(): any { return null; },
            actions(): any { return null; },
            touchActions(): any { return null; },
            executeScript(): any { return null; },
            executeAsyncScript(): any { return null; },
            call(): any { return null; },
            wait(): any { return null; },
            sleep(): any { return null; },
            getWindowHandle(): any { return null; },
            getAllWindowHandles(): any { return null; },
            getPageSource(): any { return null; },
            close(): any { return null; },
            get(): any { return null; },
            getCurrentUrl(): any { return null; }
        };
        setBrowser(mock);
    }

    t.test("returns an instance of the page", function (t: test.Test):void {
        before();
        let result:SamplePage = on(SamplePage);
        t.notEqual(result, undefined);
        t.notEqual(result, null);
        t.end();
    });

    // This test doesn't really belong here, move it later.
    t.test("actions return the page instance", function (t: test.Test):void {
        before();
        let result:SamplePage = on(SamplePage).submit.visible();
        t.true(result instanceof SamplePage);
        t.end();
    });
});
