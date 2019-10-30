const   gulp = require("gulp"),
        concat = require("gulp-concat"),
        autoprefixer = require("gulp-autoprefixer"),
        cleanCSS = require('gulp-clean-css'),
        uglify = require('gulp-uglify'),
        del = require('del'),
        browserSync = require('browser-sync').create(),
        babel = require('gulp-babel'),
        sass = require('gulp-sass'),
        smartgrid = require('smart-grid'),
        sourcemaps = require("gulp-sourcemaps");

const cssFiles = [
    "./node_modules/normalize.css/normalize.css",
    "./src/scss/main.scss"
];

const jsFiles = [
    // "./node_modules/moment/moment.js",
    // "./node_modules/jquery/dist/jquery.min.js",
    // "./src/js/lodash.min.js",
    "./src/js/main.js",
];


function styles() {
    return gulp.src(cssFiles)
                .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(concat("all.css"))
                .pipe(autoprefixer({
                    browsers: ['> 0.1%'],
                    cascade: false
                }))
                .pipe(cleanCSS({
                    level: 2
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest("./dist/css"))
                .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
                .pipe(babel())
                .pipe(concat("all.js"))
                .pipe(uglify({
                    toplevel: true
                }))
                .pipe(gulp.dest("./dist/js"))
                .pipe(browserSync.stream());
}


function clean() {
    return del(["dist/*"])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./*.html', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('build', gulp.parallel('styles', 'scripts'));

gulp.task('watch', watch);

gulp.task('dev', gulp.series('build', 'watch'));



