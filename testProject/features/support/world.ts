import * as wd from "selenium-webdriver";



import {setBrowser} from "page-object-js";

const driver = new wd.Builder()
                     .forBrowser('chrome')
                     .build();

setBrowser(driver);

export = function() {
    this.World.prototype.browser = driver;
};

