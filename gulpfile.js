//2016/2/11 Mike
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

//重置
gulp.task('clean', function() {
    return del(['build']);
});

// Sass編譯任務
gulp.task('sass', ['clean'], function() {
    return gulp.src(['./assets/scss/**.{scss,sass}'])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({
                //outputStyle: 'nested'
                outputStyle: 'compressed'
               
            })
            .on('error', sass.logError))
        .pipe(minifycss({ keepSpecialComments: 1 }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/'))
});

//Js壓縮任務
gulp.task('mizjs', ['clean'], function() {
    return gulp.src(['./assets/js/**.js'])
        //.pipe(uglify({ output: { comments: /^!|@preserve|@license|@cc_on/i } }))
        .pipe(sourcemaps.init())
        .pipe(concat('miz.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/'));
});




//任務"css"負責'sass'這個版型相關的編譯任務
gulp.task('css', ['sass']);
//任務"mizjs"負責'js壓縮任務
gulp.task('js', ['mizjs']);


//預設任務
gulp.task('default', ['css', 'mizjs'], function() {
    gulp.watch('./assets/scss/**/**.{scss,sass}', ['css']);
    gulp.watch('./assets/js/**/**.js', ['js']);
});
