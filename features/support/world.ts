var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome');

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(/* ... */)
    .build();

module.exports = function() {
    this.World.prototype.browser = driver;
};
