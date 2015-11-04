var gulp = require('gulp');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync').create();

gulp.task('webpack', function(){
  gulp.src('index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', function(){
  browserSync.init({
    files: [
      'dist/**',
      'index.html',
    ],
    server: {
      baseDir: './',
      index: 'index.html',
    }
  });
});

gulp.task('default', ['webpack', 'browser-sync']);
