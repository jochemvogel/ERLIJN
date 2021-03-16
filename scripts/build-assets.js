const gulp = require('gulp')

return gulp.src([
        './src/sw.js',
        './src/manifest.json',
    ])
    .pipe(gulp.dest('./public/'))
