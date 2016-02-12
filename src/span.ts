import {getBrowser} from "./index";
import * as selwd from "selenium-webdriver";
const by: typeof selwd.By = selwd.By;

export class Span {
    private _locator: any;
    constructor(locator: any) {
        this._locator = locator;
    }
    get text(): any {
        return getBrowser().findElement(by.id(this._locator.id)).getText();  //<== De-promisify
    }
}
