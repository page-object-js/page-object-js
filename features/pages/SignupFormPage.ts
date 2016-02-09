import {IBasePage} from '../../src/index'

export class SignupFormPage implements IBasePage {
    public url: string = 'http://localhost:3000/signup_form.html';
    public signUp: Button = new Button();  // <== Pass in a locator
    public foo: Button = new Button(); // <== Pass in a locator
}

class Button {
    public visible: boolean = true;
}
