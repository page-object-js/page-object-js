import * as selwd from "selenium-webdriver";
const by: typeof selwd.By = selwd.By;

import {getBrowser} from "./index";
import Locator, { IIdLocator } from "./locator";

export default class BaseElement {
    private _locator: Locator;

    constructor(locator: Locator) {
        this._locator = locator;
    }

    public click(): selwd.promise.Promise<void> {
        return this._getElement(getBrowser(), this._locator).click();
    }

    get innerHtml(): selwd.promise.Promise<string> {
        return this._getElement(getBrowser(), this._locator).getInnerHtml();
    }

    get outerHtml(): selwd.promise.Promise<string> {
        return this._getElement(getBrowser(), this._locator).getOuterHtml();
    }

    get text(): selwd.promise.Promise<string> {
        return this._getElement(getBrowser(), this._locator).getText();
    }

    private _getElement(browser: selwd.WebDriver, locator: Locator):selwd.WebElement {
        return browser.findElement(by.id((<IIdLocator>locator).id));
    }
}
