import test = require("tape");

test(
    "example",
    function (t) {
        t.plan(1);

        setTimeout(
            function () { t.ok(true, "true should be truthy") },
            200
        );
    });
