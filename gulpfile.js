var gulp = require("gulp")
var browserify = require("browserify")
var source = require("vinyl-source-stream")
var tsify = require("tsify")


var paths = {
    pages: ["src/*.html"]
}

async function copyHtml() {
    gulp.src(paths.pages).pipe(gulp.dest("dist"))
}



exports.default =

    gulp.series(gulp.parallel(copyHtml), async function () {
        return browserify({
                basedir: ".",
                debug: true,
                entries: ["src/main.ts"],
                cache: {},
                packageCache: {},
            })
            .plugin(tsify)
            .bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("dist"))
    })