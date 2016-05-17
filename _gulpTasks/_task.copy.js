'use strict';

module.exports = function(gulp, config) {

  gulp.task('copy:fonts', function(){
    return gulp.src(config.source + config.src.fonts + '/**/*')
    .pipe(gulp.dest(config.client + config.dest.fonts + '/'));
  });

  gulp.task('copy:html', function(){
    return gulp.src('./*.html')
    .pipe(gulp.dest(config.build));
  });

  gulp.task('copy:build', function(){
    return gulp.src(config.client + '/**/*')
    .pipe(gulp.dest(config.build));
  });

};
