var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();// 静态服务器
// gulp.task('default', function () {
//   // 将你的默认的任务代码放在这
// });
gulp.task('less', function () {
  return gulp.src('./src/css/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist/css/'));
});
gulp.task('babel', () =>
  gulp.src('./src/js/util.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js/'))
);
gulp.task('html', () =>
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist/'))
);
gulp.task('watch', function () {
  gulp.watch('./src/css/*.less', ['less'])
  gulp.watch('./src/js/*.js', ['babel'])
  gulp.watch('./src/index.html', ['html'])
})
gulp.task('browser-sync', function () {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './dist',  // 设置服务器的根目录
    }
  });
});// 代理
// gulp.task('browser-sync', function () {
//   browserSync.init({ proxy: "localhost" });
// });
gulp.task('default', ['watch', 'browser-sync']);