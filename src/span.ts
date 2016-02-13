import {getBrowser} from "./index";
import {Page} from "./page";
import * as selwd from "selenium-webdriver";
const by: typeof selwd.By = selwd.By;

export class Span {
    private _locator: any;
    private _page: Page;
    constructor(locator: any, page: Page) {
        this._locator = locator;
        this._page    = page;
    }
    get text(): any {
        const promise: any = getBrowser().findElement(by.id(this._locator.id)).getText();
        this._page.addParallelPromise(promise);
        return this._page;
    }
}
