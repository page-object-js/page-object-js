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
     const instance: T = new ctor();
     return instance;
}

export function setBrowser(browser: any) {
    GLOBAL.browser = browser;
}

export function getBrowser() {
    return GLOBAL.browser;
}

export {Button} from './button'
