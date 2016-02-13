import {getBrowser} from "./index";
import {Page} from "./page";
import * as selwd from "selenium-webdriver";
const by: typeof selwd.By = selwd.By;

export class Span<P extends Page> {
    private _locator: any;
    private _page: P;

    constructor(locator: any, page: P) {
        this._locator = locator;
        this._page    = page;
    }

    public text(): P {
        const promise: any = getBrowser().findElement(by.id(this._locator.id)).getText();
        this._page.addParallelPromise(promise);
        return this._page;
    }
}
