// This is the main module.
// Whatever this module exports is what the client will get when requiring this
// node package:
//
// require("page-object-js");

// I think we want to export:
// visit, on, setBrowser               <= Functions
// IBasePage                           <= Base type for pages
// All the web element types           <= TextField, Button, Div, etc Types

export interface IBasePage {
    url: string;
}

export function on<T extends IBasePage>(ctor: {new(): T}): T {
    "use strict";
    const instance: T = new ctor();  // <== Pass in the browser here?  Or do all elements get it.
    return instance;
}

// export function visit<T extends IBasePage>(ctor: {new(): T}): Promise<T> {
//     const instance = new ctor();
//     return browser.get(instance.url)
//                   .then(() => { return instance; });
// };

//What we want from the outside
// class SamplePage implements IBasePage {
//     public url: string = 'http://www.google.com';
// }

// visit(SamplePage).then((page) => {
//     page.username.text = 'Kyle';
//     page.submit.click();
// });
