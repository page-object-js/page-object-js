
import {getBrowser} from '../../src/browser';
module.exports = function() {
    this.AfterFeatures(function(scenario, done) {
        getBrowser().quit();
        done();
    });
};
