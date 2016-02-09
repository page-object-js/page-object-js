
import {getBrowser} from './index'
const   By      = require('selenium-webdriver').By;

export class Button {
    private _locator: any;
    constructor(locator: any) {
        this._locator = locator;
    }
    get visible(): any {
        return getBrowser().isElementPresent(By.id(this._locator.id));  //<== De-promisify
    }
}

//Other thoughts:
// Someone else should handle mapping our locator object to the fluent syntax
