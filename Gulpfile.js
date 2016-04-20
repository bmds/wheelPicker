"use strict";

var gulp = require('gulp');
var runSeq = require('run-sequence');

var config = require('./_config/project');


var postCSS = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');

var concat = require('gulp-concat');

var watch = require('gulp-watch');

var surge = require('gulp-surge')

var sassConfig = {
  errLogToConsole: true,
  includePaths:    [config.source + config.src.styles + '/*.scss'],
  outputStyle:     'compact'
};

gulp.task('watch:css', function() {
  gulp.watch(config.source + config.src.styles + '/*.scss', ['css']);
});

gulp.task('watch:js', function() {
  gulp.watch(config.source + config.src.scripts + '/*.js', ['scripts']);
});

gulp.task('watch', ['watch:css', 'watch:js']);

gulp.task('scripts', function() {
  return gulp.src(config.source + config.src.scripts + '/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.client + config.dest.scripts + '/'));
});

gulp.task('css', function() {

  var plugins = [
    autoprefixer({browsers: ['last 1 version']})
  ];

  return gulp.src(config.source + config.src.styles + '/main.scss')
    .pipe(sass(sassConfig))
    .pipe(postCSS(plugins))
    .pipe(gulp.dest(config.client + config.dest.styles + '/'))
});

gulp.task('copy:fonts', function(){
  return gulp.src(config.source + config.src.fonts + '/**/*')
  .pipe(gulp.dest(config.client + config.dest.fonts + '/'))
});

gulp.task('copy:html', function(){
  return gulp.src('./*.html')
  .pipe(gulp.dest(config.build))
});

gulp.task('copy:build', function(){
  return gulp.src(config.client + '/**/*')
  .pipe(gulp.dest(config.build + '/_client'))
});


gulp.task('surge', function () {
  return surge({
    project: './build',
    domain: 'wonder-wheel.surge.sh'
  })
})

gulp.task('default', function() {
  runSeq(['css' , 'scripts' , 'copy:fonts' , 'watch' ]);
});

gulp.task('build', function() {
  runSeq(['css' , 'scripts' , 'copy:fonts'], ['copy:build', 'copy:html']);
});

gulp.task('deploy', function() {
  runSeq(['build'],['surge']);
});
