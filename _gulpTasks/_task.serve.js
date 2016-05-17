'use strict';

var connect = require('gulp-connect');

module.exports = function(gulp, config) {

   gulp.task('connect', function() {
      connect.server({
         root: ['./', config.client],
         livereload: true
      });
   });
};
