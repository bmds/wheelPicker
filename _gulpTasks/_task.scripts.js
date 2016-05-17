var concat = require('gulp-concat');

module.exports = function(gulp, config) {
  gulp.task('scripts', function() {
    return gulp.src([
      config.source + config.src.scripts + '/namespace.js',
      config.source + config.src.scripts + '/Utilities.js',
      config.source + config.src.scripts + '/players.js',
      config.source + config.src.scripts + '/wheel.js'
    ])
      .pipe(concat('main.js'))
      .pipe(gulp.dest(config.client + config.dest.scripts + '/'));
  });
};
