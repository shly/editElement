var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function () {
  // 将你的默认的任务代码放在这
});
gulp.task('less', function () {
  return gulp.src('.src/css/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('watch', function () {
  gulp.watch('./src/css/*.less', ['less'])
})