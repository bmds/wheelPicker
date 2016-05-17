'use strict';

module.exports = function(gulp, config) {

  gulp.task('copy:fonts', function(){
    return gulp.src(config.source + config.src.fonts + '/**/*')
    .pipe(gulp.dest(config.public + config.dest.fonts + '/'));
  });

  gulp.task('copy:html', function(){
    return gulp.src('./*.html')
    .pipe(gulp.dest(config.public));
  });

};
