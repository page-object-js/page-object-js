import {Button, Span, Page} from 'page-object-js';

export class SignupFormPage extends Page {
    public signUp:  Button        = new Button({id: 'sign-up'}, this);
    public foo:     Button        = new Button({id: 'foo'}, this);
    public submitCount: Span      = new Span({id: 'submit-count'}, this);
    public deleteDatabase: Button = new Button({ id: 'delete-database' }, this);
}
