import {Button, Span} from '../../src/index'

export class SignupFormPage {
    public signUp:  Button = new Button({id: 'sign-up'});
    public foo:     Button = new Button({id: 'foo'});
    public submitCount: Span = new Span({id: 'submit-count'});
    public deleteDatabase: Button = new Button({ id: 'delete-database' });
}
