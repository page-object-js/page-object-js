import * as selwd from "selenium-webdriver";
const by: typeof selwd.By = selwd.By;

import {getBrowser} from "./index";
import Locator from "./locator";

export default class BaseElement {
    private _locator: Locator;

    constructor(locator: Locator) {
        this._locator = locator;
    }

    public click(): selwd.promise.Promise<void> {
        return getBrowser().findElement(by.id(this._locator.id)).click();
    }

    get innerHtml(): selwd.promise.Promise<string> {
        return getBrowser().findElement(by.id(this._locator.id)).getInnerHtml();
    }

    get outerHtml(): selwd.promise.Promise<string> {
        return getBrowser().findElement(by.id(this._locator.id)).getOuterHtml();
    }

    get text(): selwd.promise.Promise<string> {
        return getBrowser().findElement(by.id(this._locator.id)).getText();
    }
}
