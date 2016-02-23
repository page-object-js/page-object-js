import {Button, Span, Page} from 'page-object-js';

export class SignupFormPage extends Page {
    public signUp:Button<SignupFormPage>         = new Button({id: 'sign-up'}, this);
    public foo:Button<SignupFormPage>            = new Button({id: 'foo'}, this);
    public submitCount:Span<SignupFormPage>      = new Span({id: 'submit-count'}, this);
    public deleteDatabase:Button<SignupFormPage> = new Button({id: 'delete-database'}, this);
}
