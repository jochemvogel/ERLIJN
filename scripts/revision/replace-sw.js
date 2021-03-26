const gulp = require("gulp");
const revRewrite = require("gulp-rev-rewrite");
const { readFileSync } = require("fs");

const manifest = readFileSync("public/rev-manifest.json");

return gulp
    .src(["./public/sw.js"])
    .pipe(revRewrite({ manifest }))
    .pipe(gulp.dest("./public"));
