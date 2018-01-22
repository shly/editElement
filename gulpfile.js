var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();// 静态服务器
var imagemin = require('gulp-imagemin');
// gulp.task('default', function () {
//   // 将你的默认的任务代码放在这
// });
gulp.task('less', function () {
  return gulp.src('./src/css/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./docs/css/'));
});
gulp.task('babel', () =>
  gulp.src('./src/js/util.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./docs/js/'))
);
gulp.task('html', () =>
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./docs/'))
);
gulp.task('imgMin', () =>
  gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./docs/img/'))
);
gulp.task('watch', function () {
  gulp.watch('./src/css/*.less', ['less'])
  gulp.watch('./src/js/*.js', ['babel'])
  gulp.watch('./src/index.html', ['html'])
  gulp.watch('./src/img/*', ['imgMin'])
})
gulp.task('browser-sync', function () {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './docs',  // 设置服务器的根目录
    }
  });
});// 代理
gulp.task('default', ['watch', 'browser-sync']);