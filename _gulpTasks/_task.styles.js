'use strict';

// Style tasks
var postCSS         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var cssNano         = require('cssnano');
var minifySelectors = require('postcss-minify-selectors');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');

module.exports = function(gulp, config) {

   var plugins = [
      autoprefixer({browsers: ['last 1 version']}),
      minifySelectors(),
      cssNano()
   ];

  var sassConfig = {
    errLogToConsole: true,
    includePaths:    [config.source + config.src.styles + '/*.scss'],
    outputStyle:     'compact'
  };

  gulp.task('css', function() {

    return gulp.src(config.source + config.src.styles + '/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass(sassConfig))
      .pipe(postCSS(plugins))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.public + config.dest.styles + '/'));
  });
};
