'use strict';

var gulp = require('gulp');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');


gulp.task('lint', function() {
	var jshint = require('gulp-jshint');

  gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', function(){
	var clean = require('gulp-clean');

	gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('browserify', function(){
	var source = require('vinyl-source-stream');
	var browserify = require('browserify');

	browserify('./supergenpass-lib', {standalone: 'supergenpass'})
		.bundle()
		.pipe(source('supergenpass-lib.browser.js'))
		.pipe(streamify(uglify({preserveComments: 'some'})))
		.pipe(gulp.dest('./dist'));
});
