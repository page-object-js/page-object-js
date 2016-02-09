const   By      = require('selenium-webdriver').By,
        expect  = require('chai').expect;

import {SignupFormPage} from '../pages/SignupFormPage';
import {on} from '../../src/index';

module.exports = function () {
    this.When(/^I am viewing the sample login page$/, function () {
        this.browser.get('http://localhost:3000/signup_form.html');
        // This should not be so complicated.  Want to get to this:
        // visit(SignupFormPage);
    });
    this.Then(/^a SignUp button should exist$/, function () {
        // this.browser.isElementPresent(By.id('sign-up')).then((val) => {
        //     expect(val).to.equal(true);
        //     done();
        // });

        // This should not be so complicated.  Want to get to this:
        expect(on(SignupFormPage).signUp.visible).to.equal(true);
    });
    this.Then(/^a Foo button should not exist$/, function () {
        // this.browser.isElementPresent(By.id('foo')).then((val) => {
        //     expect(val).to.equal(false);
        //     done();
        // });

        // This should not be so complicated.  Want to get to this:
        expect(on(SignupFormPage).foo.visible).to.equal(false);
    });
};
