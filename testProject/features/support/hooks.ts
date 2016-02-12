
import {getBrowser} from 'page-object-js';

//module.exports = function() {
export =  function () {
    this.AfterFeatures(function(scenario, done) {
        getBrowser().quit();
        done();
    });
};
