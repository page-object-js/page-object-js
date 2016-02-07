
var By = require('selenium-webdriver').By;
module.exports = function () {
    this.When(/^I am viewing the sample login page$/, function () {
        // Write code here that turns the phrase above into concrete actions
        this.browser.get('http://localhost:3000/signup_form.html');
    });

    this.Then(/^a SignUp button should exist$/, function () {
        console.log(this.browser.isElementPresent(By.id('sign-up')));
    });

    this.Then(/^a Foo button should not exist$/, function () {
        console.log(this.browser.isElementPresent(By.id('sign-up')));
    });
};
