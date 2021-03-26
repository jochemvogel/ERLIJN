const gulp = require("gulp");

return gulp.src(["./src/img/**/*.*"]).pipe(gulp.dest("./public/img/"));
