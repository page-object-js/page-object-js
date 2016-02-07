module.exports = function () {
    this.When(/^I am viewing the sample login page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a button with an id of "([^"]*)" should exist$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a button with an id of "([^"]*)" should not exist$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};
