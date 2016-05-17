"use strict";

var gulp = require('gulp');
var runSeq = require('run-sequence');

// Configuration
var config = require('./_config/project');

require('./_gulpTasks/_task.styles')(gulp, config);
require('./_gulpTasks/_task.scripts')(gulp, config);
require('./_gulpTasks/_task.copy')(gulp, config);
require('./_gulpTasks/_task.watch')(gulp, config);
require('./_gulpTasks/_task.surge')(gulp, config);
require('./_gulpTasks/_task.serve')(gulp, config);

gulp.task('build', ['css' , 'scripts' , 'copy:fonts', 'copy:html']);

gulp.task('default', ['build' , 'connect', 'watch' ]);

gulp.task('deploy', function() {
  runSeq(['build'], ['surge']);
});
