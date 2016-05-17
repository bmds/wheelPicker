'use strict';

var watch = require('gulp-watch');

module.exports = function(gulp, config) {

  gulp.task('watch:css', function() {
    gulp.watch(config.source + config.src.styles + '/*.scss', ['css']);
  });

  gulp.task('watch:js', function() {
    gulp.watch(config.source + config.src.scripts + '/*.js', ['scripts']);
  });

  gulp.task('watch', ['watch:css', 'watch:js']);
};
