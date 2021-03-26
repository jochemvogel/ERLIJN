const gulp = require("gulp");
const revRewrite = require("gulp-rev-rewrite");
const { readFileSync } = require("fs");

const manifest = readFileSync("public/rev-manifest.json");

return gulp
    .src(["views/partials/head.ejs", "views/partials/end.ejs"])
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest("views/partials/public"));
