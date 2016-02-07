module.exports = function () {
    this.When(/^I am viewing the sample login page$/, function (done) {
        // visit(SampleSignupPage);  // Eventually, we want something like this.
        this.browser.visit('http://localhost:4567/sample_page.html', done);
    });

    this.Then(/^a SignUp button should exist$/, function (callback) {
        /* Eventually, we want something like this:
        return on(SampleSignupPage).then(function (page) {
            expect(page.signup.present).toBe(true);
        });
        */
        callback.pending();
    });

    this.Then(/^a Foo button should not exist$/, function (callback) {
        /* Eventually, we want something like this:
        return on(SampleSignupPage).then(function (page) {
            expect(page.foo.present).toBe(false);
        });
        */
        callback.pending();
    });
};
