const gulp = require('gulp')

return gulp.src([
        './src/img/**/*.*',
        './src/sw.js',
        './src/manifest.json',
    ])
    .pipe(gulp.dest('./public/'))
