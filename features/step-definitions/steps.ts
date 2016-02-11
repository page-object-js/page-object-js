const   By      = require('selenium-webdriver').By,
        expect  = require('chai').expect;

import {SignupFormPage} from '../pages/SignupFormPage';
import {on} from '../../src/index';

module.exports = function () {
    this.When(/^I am viewing the sample login page$/, function () {
        this.browser.get('http://localhost:3000/signup_form.html');
        // This should not be so complicated.  Want to get to this:
        // visit(SignupFormPage);  Or maybe we can just always use 'on' and let it decide whether to do a get?
    });
    this.Then(/^a SignUp button should exist$/, function (done) {
        // Plain WD looks like this:
        // this.browser.isElementPresent(By.id('sign-up')).then((val) => {
        //     expect(val).to.equal(true);
        //     done();
        // });

        //Wrapped up in page object, but still promisey:
        on(SignupFormPage).signUp.visible.then(function(val) {
            expect(val).to.equal(true);
            done();
        });

        // This should not be so complicated.  Want to get to this:
        //expect(on(SignupFormPage).signUp.visible).to.equal(true);

        // Don't really need promises for the on, but, here's what it looks like:
        // on(SignupFormPage).then((page) => {
        //     expect(page.signUp.visible).to.equal(true);
        // });
    });
    this.Then(/^a Foo button should not exist$/, function (done) {
        on(SignupFormPage).foo.visible.then(function(val) {
            expect(val).to.equal(false);
            done();
        });
    });

    this.Then(/^I should see a submit count of (\d+)$/, function (expected, done) {
        on(SignupFormPage).submitCount.text.then(function(val) {
            expect(val).to.equal(expected);
            done();
        });
    });

    this.Then(/^the SignUp button should be enabled$/, function (done) {
        on(SignupFormPage).signUp.isEnabled.then(function(val) {
            expect(val).to.equal(true);
            done();
        });
    });

    this.Then(/^a DeleteDatabase button should be disabled$/, function (done) {
        on(SignupFormPage).deleteDatabase.isEnabled.then(function(val) {
            expect(val).to.equal(false);
            done();
        });
    });
};
