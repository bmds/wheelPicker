module.exports = function(grunt) {
		'use strict';

		require('time-grunt')(grunt);
		require('jit-grunt')(grunt);

		grunt.loadNpmTasks('grunt-surge');
		// Project configuration.
		grunt.initConfig({
				pkg:           grunt.file.readJSON('package.json'),
				configSass:    grunt.file.readJSON('Gruntconfig/sass.json'),

				/*------------------
				|   SYSTEM TASKS
				------------------*/

				// ### watch
				// NPM: grunt-contrib-watch
				//
				// Executes the listed targets on file save
				// Watches folders for file changes and then runs the specified tasks

				watch: {
						sassBase: {
								files: ['sass/**/**.scss','sass/**/*.scss'],
								tasks: ['process-css'],
								options: {
										interrupt: true
								}
						}
				},
				/*------------------
				|   STYLE TASKS
				------------------*/

				// ### SASS
				// NPM: grunt-contrib-sass
				//
				// Builds the SASS files into CSS
				sass: {
						dev: {
								options: '<%= configSass.dev %>',
								files: {
										'styles/style.css': 'sass/main.scss'
								}
						}
				},
				jshint: {
						all: ['Gruntfile.js', 'wonder.js']
				},


				// ### Autoprefixer
				// NPM: grunt-autoprefixer
				//
				// Parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
				autoprefixer: {
						main: {
								options: {
										browsers: ['last 2 version']
								},
								src: './styles/style.css',
								dest: './styles/style.css'
						}
				},

				connect: {
						server: {
								options: {
										port: 8080,
										base: './'
								}
						}
				},

				surge: {
					'spinner': {
						options: {
							project: './build',
							domain: 'wonder-wheel.surge.sh'
						}
					}
				}

		});

		// Load local tasks from project root.
		// // This is required if you use any options.
		grunt.registerTask('default',     ['process-css','jshint', 'watch']);
		grunt.registerTask('deploy',     ['surge']);
		grunt.registerTask('release',     ['process-css','jshint', 'surge']);
		grunt.registerTask('process-css', ['sass:dev', 'autoprefixer']);
};
