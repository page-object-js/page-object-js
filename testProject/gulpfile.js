var path        = require("path"),
    gulp        = require("gulp"),
    q           = require("q"),
    gulpHelpers = require("../gulpHelpers/gulpHelpers"),
    cucumber    = require('gulp-cucumber');

// todo:  Add tslint task.

// todo:  Need to add a build step and it needs to be a prereq for "cukes"
// Will also need to adjust the paths in the below cukes task so that they
// point to the dist folder.

////////////////////////////////////////////////////////////////////////////////
// build
////////////////////////////////////////////////////////////////////////////////
gulp.task("build", function () {
    "use strict";

    var outputDir = path.join(__dirname, "dist");

    return gulpHelpers.buildTypeScript(
        getTypeScriptSourceGlobs(false, true), outputDir, outputDir);
});

////////////////////////////////////////////////////////////////////////////////
// cukes
////////////////////////////////////////////////////////////////////////////////
gulp.task("cukes", ["build"], function () {

    "use strict";

    startServer(path.join(__dirname, "src"))
        .then(
            function (destroyServerFunc) {

                var cukeStream = gulp.src('features/*')
                    .pipe(cucumber({
                        'steps':   'features/step-definitions/*.js',
                        'support': 'features/support/*.js',
                        'format':  'pretty'
                    }));

                return gulpHelpers.streamToPromise(cukeStream)
                    .then(destroyServerFunc);
            }
        );
    }
);


////////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////////

function getTypeScriptSourceGlobs(includeSpecs, includeTypings) {
    "use strict";

    var tsSources = [
        "src/**/*.ts",
        "features/**/*.ts"
    ];

    if (!includeSpecs) {
        tsSources.push("!src/**/*.spec.ts");
    }

    if (includeTypings) {
        tsSources.push("typings/main.d.ts");
        tsSources.push("typings/main/**/*.d.ts");
        tsSources.push("node_modules/page-object-js/dist/**/*.d.ts");
    }

    return tsSources;
}

//
// Starts a static file server for the specified directory on the specified port.
// Returns a promise for a function that should be called (with no arguments) when the
// server should be destroyed.
//
function startServer(directory, port) {
    "use strict";

    var staticSrv     = require("node-static"),
        enableDestroy = require("server-destroy"),
        fileServer    = new staticSrv.Server(directory),
        dfd           = q.defer(),
        server;

    // If not provided, use a default port of 3000.
    port = port || 3000;

    server = require('http').createServer(
        function (request, response) {
            request
                .addListener(
                    'end',
                    function () {
                        fileServer.serve(request, response);
                    }
                )
                .resume();
        }
    );

    server.listen(
        port,
        function (err) {
            if (err) {
                console.log('Error starting server:', err);
                dfd.reject(err);
                return;
            }

            console.log('Server running on port:', port);
            enableDestroy(server);
            dfd.resolve(function () {
                console.log('Shutting down server.');
                server.destroy();
            });
        }
    );

    return dfd.promise;
}
