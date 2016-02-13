import {getBrowser} from "./index";
import * as selwd from "selenium-webdriver";
import {Page} from "./page";

const by: typeof selwd.By = selwd.By;

export class Button {
    private _locator: any;
    private _page: Page;
    public constructor(locator: any, page: Page) {
        this._locator = locator;
        this._page    = page;
    }
    public visible(): any {
        const promise: any = getBrowser().isElementPresent(by.id(this._locator.id));
        this._page.addParallelPromise(promise);
        return this._page;
    }
    public isEnabled(): any {
        const promise: any = getBrowser().findElement(by.id(this._locator.id)).isEnabled();
        this._page.addParallelPromise(promise);
        return this._page;
    }
}

//Other thoughts:
// Someone else should handle mapping our locator object to the fluent syntax
