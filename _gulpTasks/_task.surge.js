'use strict';

var surge = require('gulp-surge');

module.exports = function(gulp, config) {

  gulp.task('surge', function () {
    return surge({
      project: config.public,
      domain: 'wonder-wheel.surge.sh'
    });
  })
};
