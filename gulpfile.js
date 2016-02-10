var gulp        = require("gulp"),
    sourcemaps  = require("gulp-sourcemaps"),
    path        = require("path"),
    q           = require("q"),
    mergeStream = require('merge-stream'),
    chalk       = require('chalk'),
    cucumber    = require('gulp-cucumber');


////////////////////////////////////////////////////////////////////////////////
// default
////////////////////////////////////////////////////////////////////////////////
gulp.task("default", ["usage"], function () {

});


////////////////////////////////////////////////////////////////////////////////
// usage
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "usage",
    function () {
        var lines = [
            chalk.green("gulp [usage]"),
            "    Show this usage information",
            "",
            chalk.green("gulp clean"),
            "    Delete all generated files.  You must run 'npm run setup'",
            "    to setup the project once again.",
            "",
            chalk.green("gulp ut"),
            "    Build and run the unit tests",
            "",
            chalk.green("gulp buildRelease"),
            "    Builds a release.",
            "",
            chalk.green("gulp cukes"),
            "    Starts the sample server and runs the cukes.",
            ""
        ];

        console.log(lines.join("\n"));
    }
);

////////////////////////////////////////////////////////////////////////////////
// clean
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "clean",
    function (cb) {
        var del = require("del"),
            dirsToDelete = [
                "dist",
                "typings",
                "node_modules",
                "tmp"
            ];

        del(dirsToDelete, cb);
    }
);


////////////////////////////////////////////////////////////////////////////////
// tslint
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "tslint", function () {
        var tslint = require("gulp-tslint"),
            tsSources = getTypeScriptSourceGlobs(true, false);

        return gulp.src(tsSources)
            .pipe(tslint())
            .pipe(tslint.report("verbose"));
    }
);


////////////////////////////////////////////////////////////////////////////////
// buildRelease
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "buildRelease",
    ["tslint"],
    function () {
        var releaseBinDir     = path.join(__dirname, "dist"),
            releaseTypingsDir = path.join(__dirname, "dist", "typings");

        return buildTypeScript(
            false,
            releaseBinDir,
            releaseTypingsDir);
    }
);


////////////////////////////////////////////////////////////////////////////////
// ut
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "ut",
    ["tslint"],
    function () {

        var utSrcDir     = path.join(__dirname, "tmp", "ut"),
            utTypingsDir = path.join(__dirname, "tmp", "ut", "typings");

        return buildTypeScript(true, utSrcDir, utTypingsDir)
            .then(function () {
                var tape   = require("gulp-tape"),
                    faucet = require("faucet"),
                    stream;

                stream = gulp.src(utSrcDir + "/**/*.spec.js")
                    .pipe(tape({reporter: faucet()}));

                return streamToPromise(stream);
            });
    }
);


////////////////////////////////////////////////////////////////////////////////
// cukes
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "cukes",
    function (done) {
        var destroyServer = startServer(path.join(__dirname, "features", "sample_pages"));

        setTimeout(function() {
            gulp.src('features/*')
            .pipe(cucumber({
                'steps': 'features/step-definitions/*.js',
                'support': 'features/support/*.js',
                'format': 'pretty'
            }))
            .on('end', function() {
                destroyServer();
                done();
            });
        }, 1000)
    }
);


////////////////////////////////////////////////////////////////////////////////
// Helper Functions
////////////////////////////////////////////////////////////////////////////////

function streamToPromise(stream) {
    var dfd = q.defer();

    stream.once("error", function (err) {
        dfd.reject(err);
    });

    stream.once("end", function () {
        dfd.resolve();
    });

    return dfd.promise;
}


function getTypeScriptSourceGlobs(includeSpecs, includeTypings) {
    var tsSources = ["src/**/*.ts"];

    if (!includeSpecs) {
        tsSources.push("!src/**/*.spec.ts");
    }

    if (includeTypings) {
        tsSources.push("typings/main.d.ts");
        tsSources.push("typings/main/**/*.d.ts");
    }

    return tsSources;

}


function buildTypeScript(includeSpecs, jsOutputDir, typingsOutputDir) {
    var ts           = require('gulp-typescript'),
        tsHelpers    = require('gulpTsHelpers'),
        inputTsFiles = getTypeScriptSourceGlobs(includeSpecs, true),
        tsResults,
        merged,
        tsPromise;

    tsResults = gulp.src(inputTsFiles, {base: 'src'})
        .pipe(sourcemaps.init())
        .pipe(ts({
                target:            'ES5',
                declarationFiles:  true,
                noExternalResolve: true,
                noEmitOnError:     true,
                module:            'commonjs'
            },
            undefined,
            ts.reporter.longReporter()));

    merged = mergeStream(
        tsResults.dts.pipe(gulp.dest(typingsOutputDir)),
        tsResults.js.pipe(sourcemaps.write())
            .pipe(gulp.dest(jsOutputDir))
    );

    tsPromise = tsHelpers.processTsResults(tsResults, merged);
    return tsPromise;
}


//
// Starts a static file server for the specified directory on the specified port.
// Returns a function that should be called (with no arguments) when the server
// should be destroyed.
//
function startServer(directory, port) {
    var staticSrv = require("node-static"),
        enableDestroy = require("server-destroy"),
        fileServer = new staticSrv.Server(directory),
        server;

    // If not provided, use a default port of 3000.
    port = port || 3000;

    server = require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    });

    server.listen(port);
    enableDestroy(server);
    console.log('Serving running on port:', port)

    return server.destroy;
}
