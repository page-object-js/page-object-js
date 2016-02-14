/// <reference path="../../typings/main.d.ts" />

import * as chai from "chai";
const expect = chai.expect;
import {SignupFormPage} from '../pages/SignupFormPage';
import {on} from "page-object-js";

export = function () {
    this.When(/^I am viewing the sample login page$/, function () {
        this.browser.get('http://localhost:3000/signup_form.html');
        // This should not be so complicated.  Want to get to this:
        // visit(SignupFormPage);  Or maybe we can just always use 'on' and let it decide whether to do a get?
    });
    this.Then(/^a SignUp button should exist$/, function (done) {
        //Wrapped up in page object, but still promisey:
        on(SignupFormPage).signUp.visible.then(function(val) {
            expect(val).to.equal(true);
            done();
        });
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
