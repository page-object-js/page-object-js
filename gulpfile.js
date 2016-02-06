var gulp        = require("gulp"),
    sourcemaps  = require("gulp-sourcemaps"),
    path        = require("path"),
    q           = require("q"),
    mergeStream = require('merge-stream');


////////////////////////////////////////////////////////////////////////////////
// default
////////////////////////////////////////////////////////////////////////////////
gulp.task("default", function () {

});


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
// buildRelease
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "buildRelease",
    function () {
        var releaseBinDir     = path.join(__dirname, "dist"),
            releaseTypingsDir = path.join(__dirname, "dist", "typings");

        return buildTypeScript(
            false,
            releaseBinDir,
            releaseTypingsDir);
    }
);


function buildTypeScript(includeSpecs, jsOutputDir, typingsOutputDir) {
    var ts           = require('gulp-typescript'),
        tsHelpers    = require('gulpTsHelpers'),
        inputTsFiles = [],
        tsResults,
        merged,
        tsPromise;

    // Build an array of ts files to compile.
    inputTsFiles.push("src/**/*.ts");
    if (!includeSpecs) {
        inputTsFiles.push("!src/**/*.spec.ts");
    }
    inputTsFiles.push("typings/**/*.d.ts");
    inputTsFiles.push("!typings/browser.d.ts");
    inputTsFiles.push("!typings/browser/**/*");

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

////////////////////////////////////////////////////////////////////////////////
// test
////////////////////////////////////////////////////////////////////////////////
gulp.task(
    "test",
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