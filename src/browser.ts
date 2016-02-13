import { WebDriver } from "selenium-webdriver";

let theBrowser: WebDriver;


export function setBrowser(browser: WebDriver): void {
    "use strict";
    theBrowser = browser;
}

export function getBrowser(): WebDriver {
    "use strict";
    return theBrowser;
}
