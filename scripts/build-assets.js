const gulp = require('gulp')

return gulp.src(['./src/assets/*.*', './src/assets/**/*.*'])
    .pipe(gulp.dest('./public/'))
