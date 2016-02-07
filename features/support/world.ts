var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options).init();

module.exports = function() {
    this.World.prototype.browser = client;
};
