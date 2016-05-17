var postCSS = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');


module.exports = function(gulp, config) {

  var sassConfig = {
    errLogToConsole: true,
    includePaths:    [config.source + config.src.styles + '/*.scss'],
    outputStyle:     'compact'
  };

  gulp.task('css', function() {

    var plugins = [
      autoprefixer({browsers: ['last 1 version']})
    ];

    return gulp.src(config.source + config.src.styles + '/main.scss')
      .pipe(sass(sassConfig))
      .pipe(postCSS(plugins))
      .pipe(gulp.dest(config.client + config.dest.styles + '/'));
  });
};
