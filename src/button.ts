import {getBrowser} from "./index";
import * as selwd from "selenium-webdriver";

const by: typeof selwd.By = selwd.By;

export class Button {
    private _locator: any;
    constructor(locator: any) {
        this._locator = locator;
    }
    get visible(): selwd.promise.Promise<boolean> {
        return getBrowser().isElementPresent(by.id(this._locator.id));
    }
    get isEnabled(): selwd.promise.Promise<boolean> {
        return getBrowser().findElement(by.id(this._locator.id)).isEnabled();
    }
}
