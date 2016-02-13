import {getBrowser} from "./index";
import * as selwd from "selenium-webdriver";
import {Page} from "./page";

const by: typeof selwd.By = selwd.By;

export class Button<P extends Page> {
    private _locator: any;
    private _page: P;

    public constructor(locator: any, page: P) {
        this._locator = locator;
        this._page    = page;
    }

    public visible(): P {
        const promise: any = getBrowser().isElementPresent(by.id(this._locator.id));
        this._page.addParallelPromise(promise);
        return this._page;
    }

    public isEnabled(): P {
        const promise: any = getBrowser().findElement(by.id(this._locator.id)).isEnabled();
        this._page.addParallelPromise(promise);
        return this._page;
    }
}
