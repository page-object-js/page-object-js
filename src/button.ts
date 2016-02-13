import {getBrowser} from "./index";
import * as selwd from "selenium-webdriver";
const by: typeof selwd.By = selwd.By;

export class Button {
    private _locator: any;
    constructor(locator: any) {
        this._locator = locator;
    }
    get visible(): any {
        return getBrowser().isElementPresent(by.id(this._locator.id));  //<== De-promisify
    }
    get isEnabled(): any /*Promise<boolean>*/ {
        return getBrowser().findElement(by.id(this._locator.id)).isEnabled();
    }
}

//Other thoughts:
// Someone else should handle mapping our locator object to the fluent syntax
