const gulp = require('gulp')
const rev = require('gulp-rev');

return gulp.src([
        'public/css/*.css', 'public/js/*.js',
    ], {base: 'public'})
    .pipe(gulp.dest('public'))
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public'))
