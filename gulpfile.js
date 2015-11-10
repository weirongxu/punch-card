var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync').create();

function webpack_src() {
  return gulp.src('index.js')
  .pipe(webpack(require('./webpack.config.js')))
}

gulp.task('webpack', function(){
  webpack_src()
  .pipe(gulp.dest('./assets'));
});

gulp.task('webpack.build', function(){
  webpack_src()
  .pipe(uglify())
  .pipe(gulp.dest('./build'));
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

gulp.task('build', ['webpack.build']);
