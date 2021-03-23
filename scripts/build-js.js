const gulp = require('gulp')
const terser = require('gulp-terser');
const concat = require('gulp-concat');


return gulp.src([
        './src/js/*.js'
    ])
    .pipe(concat('bundle.min.js'))
    .pipe(terser({ mangle: false }))
    .pipe(gulp.dest('./public/js'))
