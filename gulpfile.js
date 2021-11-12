var gulp = require("gulp")
var browserify = require("browserify")
var source = require("vinyl-source-stream")
var tsify = require("tsify")
var sourcemaps = require("gulp-sourcemaps")
var buffer = require("vinyl-buffer")


var paths = {
    pages: ["src/*.html"]
}




async function copyHtml() {
    gulp.src(paths.pages).pipe(gulp.dest("dist"))
}



exports.default = gulp.series(gulp.parallel(copyHtml), function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {},
    })
    .plugin(tsify)
    .transform("babelify", {
        presets: ["es2015"],
        extensions: [".ts"]
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"))
} )

