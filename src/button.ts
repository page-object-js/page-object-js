
import {getBrowser} from "./index";
//const   By      = require('selenium-webdriver').By;
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
}

//Other thoughts:
// Someone else should handle mapping our locator object to the fluent syntax
