import {IBasePage} from '../../src/index'

export class SignupFormPage implements IBasePage {
    public url: string = 'http://localhost:3000/signup_form.html';
    public signUp: Button = new Button({id: 'sign-up'});
    public foo: Button = new Button({id: 'foo'});
}

import {getBrowser} from '../../src/index'
const   By      = require('selenium-webdriver').By;
class Button {
    private _locator: any;
    constructor(locator: any) {
        this._locator = locator;
    }
    get visible(): any {
        return getBrowser().isElementPresent(By.id(this._locator.id));  //<== De-promisify
    }
}
