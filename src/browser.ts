// todo: Add a type for the following module scoped variable.
import { WebDriver } from "selenium-webdriver";

let theBrowser: WebDriver;

// todo: Add a type for the browser parameter
export function setBrowser(browser: WebDriver): void {
    "use strict";
    theBrowser = browser;
}

// todo: Add a type for the returned value.
export function getBrowser(): WebDriver {
    "use strict";
    return theBrowser;
}
