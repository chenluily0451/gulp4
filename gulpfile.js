/**
 * Created by chenlu on 2019/2/22.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean');

function initCss() {
    gulp.src('./static/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));

    console.log('css compressed init');
}
function initJs() {
    gulp.src('./static/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));

    console.log('js compressed init')
}

gulp.task('watchJS',function () {
    return watch('./static/js/*.js',function (event) {
        initJs();
        console.log('JSFile ' + event.path + ' changed...');
    });
});

gulp.task('clean-css',function(){
    console.log('clean css completed')
    return gulp.src('./dist/css/**/*.css');
});

gulp.task('clean-js',function(){
    console.log('clean js completed')
    return gulp.src('./dist/js/**/*.js');
});


gulp.task('compileCss',function(){
    initCss();
});

gulp.task('compileJs',function(){
    initJs();
});

gulp.task('watchSass',function () {
    return watch('./static/scss/*.scss',function (event) {
        initCss();
        console.log('CSSFile ' + event.path + ' changed...');
    })
});

// gulp4
// gulp.series：按照顺序执行
// gulp.parallel：可以并行计算,并行需要异步

gulp.task('default',gulp.series(
    'clean-css','clean-js',
    gulp.parallel('compileCss','compileJs','watchJS','watchSass',function () {
        console.log('START...')
    })
));