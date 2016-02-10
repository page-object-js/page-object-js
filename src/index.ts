// This is the main module.
// Whatever this module exports is what the client will get when requiring this
// node package:
//
// require("page-object-js");

// I think we want to export:
// visit, on, setBrowser               <= Functions
// IBasePage                           <= Base type for pages
// All the web element types           <= TextField, Button, Div, etc Types

// export interface IBasePage {
//     url: string;
// }
//
 export function on<T>(ctor: {new(): T}): T {
     "use strict";
     const instance: T = new ctor();
     return instance;
}

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

export {Button} from "./button"
