'use strict';

var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify     = require('gulp-uglify');

module.exports = function(gulp, config) {

  gulp.task('scripts', function() {
    return gulp.src([
      config.source + config.src.scripts + '/namespace.js',
      config.source + config.src.scripts + '/Utilities.js',
      config.source + config.src.scripts + '/players.js',
      config.source + config.src.scripts + '/wheel.js'
    ])
      .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.public + config.dest.scripts + '/'));
  });
};
