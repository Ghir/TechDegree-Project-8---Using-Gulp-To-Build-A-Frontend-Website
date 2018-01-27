'use strict';

var   gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
 minifyCSS = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
   connect = require('gulp-connect');


gulp.task('concatScripts', function () {
  return gulp.src(['js/global.js','js/circle/autogrow.js','js/circle/circle.js'])
  .pipe(maps.init())
  .pipe(concat('all.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'))
});

gulp.task('minifyScripts', ['concatScripts'], function () {
  return gulp.src('js/all.js')
  .pipe(uglify())
  .pipe(rename('all.min.js'))
  .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['minifyScripts'], function () {
  gulp.src('js/all.min.js')
  .pipe(gulp.dest('dist/scripts'))
});

gulp.task('compileSass', function () {
  return gulp.src('sass/global.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('minifyCSS', ['compileSass'], function () {
  return gulp.src('css/global.css')
  .pipe(minifyCSS())
  .pipe(rename('all.min.css'))
  .pipe(gulp.dest('css'));
});

gulp.task('styles', ['minifyCSS'], function () {
  gulp.src('css/all.min.css')
  .pipe(gulp.dest('dist/styles'))
});

gulp.task('images', function () {
  gulp.src(['images/*.jpg','images/*.png'])
      .pipe(imagemin())
      .pipe(gulp.dest('dist/content'))
}
);

gulp.task('watchFiles', function() {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch(['js/global.js','js/circle/*.js'], ['scripts']);
})

gulp.task('clean', function () {
  return del(['dist','js/all*.js*','css/*'])
})

gulp.task('build', ['clean'], function () {
  gulp.start(['scripts','styles','images','watchFiles']);
  gulp.src('index.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('serve', function() {
  connect.server();
});

gulp.task('default', ['build','serve']);
