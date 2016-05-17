'use strict';

var surge = require('gulp-surge');

module.exports = function(gulp, cofig) {

  gulp.task('surge', function () {
    return surge({
      project: './build',
      domain: 'wonder-wheel.surge.sh'
    });
  })
};
