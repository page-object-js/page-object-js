const wd = require('selenium-webdriver');
//          = require('selenium-webdriver/chrome');

const driver = new wd.Builder()
                            .forBrowser('chrome')
                            .setChromeOptions(/* ... */)
                            .build();

module.exports = function() {
    this.World.prototype.browser = driver;
};
