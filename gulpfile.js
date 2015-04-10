var gulp = require('gulp'),
  connect = require('gulp-connect'),
  opn = require("opn");

//Загурзка сервера
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 7777
  });
  opn('http://localhost:7777');
});

//Работа c css
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

//Работа c js
gulp.task('js', function () {
  gulp.src('./app/*.js')
    .pipe(connect.reload());
});

//Работа c html
gulp.task('html', function () {
  gulp.src('./app/js/*.html')
    .pipe(connect.reload());
});
 
 //Слежка
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
   gulp.watch(['./app/*.css'], ['css']);
    gulp.watch(['./app/*.js'], ['js']);
});
 
 //Запуск всех штукастей
gulp.task('default', ['connect', 'watch']);