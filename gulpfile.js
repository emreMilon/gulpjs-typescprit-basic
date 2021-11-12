var gulp = require("gulp")
var browserify = require("browserify")
var source = require("vinyl-source-stream")
var tsify = require("tsify")
var watchify = require("watchify")
var fancy_log = require("fancy-log")


var paths = {
    pages: ["src/*.html"]
}

var watchedBrowserify = watchify(
    browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {},
    }).plugin(tsify)
);



async function copyHtml() {
    gulp.src(paths.pages).pipe(gulp.dest("dist"))
}

async function bundle() {
    return watchedBrowserify
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"))
}


exports.default = gulp.series(gulp.parallel(copyHtml), bundle )
watchedBrowserify.on("update", bundle)
watchedBrowserify.on("log", fancy_log)

