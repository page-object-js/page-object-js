// todo: Add a type for the following module scoped variable.
let theBrowser: any;

// todo: Add a type for the browser parameter
export function setBrowser(browser: any): void {
    "use strict";
    theBrowser = browser;
}

// todo: Add a type for the returned value.
export function getBrowser(): any {
    "use strict";
    return theBrowser;
}
