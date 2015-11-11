var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var inlineSource = require('gulp-inline-source');

function webpack_src() {
  return gulp.src('index.js')
  .pipe(webpack(require('./webpack.config.js')))
}

gulp.task('webpack', function(){
  return gulp.src('index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./assets'));
});

gulp.task('webpack.build', function(){
  return gulp.src('index.js')
  .pipe(webpack(require('./webpack.build.config.js')))
  .pipe(uglify())
  .pipe(gulp.dest('./build/assets'));
});

gulp.task('html.build', function(){
  return gulp.src('index.html')
  .pipe(inlineSource())
  .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', function(){
  return browserSync.init({
    files: [
      'assets/**',
      'index.html',
    ],
    server: {
      baseDir: './',
      index: 'index.html',
    }
  });
});

gulp.task('default', ['webpack', 'browser-sync']);

gulp.task('build', function(){
  runSequence('webpack.build', 'html.build');
});
