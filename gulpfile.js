var gulp = require('gulp');

gulp.task('browserify', function(){
	var source = require('vinyl-source-stream');
	var browserify = require('browserify');

	browserify('./supergenpass')
		.bundle({ standalone: 'supergenpass' })
		.pipe(source('supergenpass.browser.js'))
		.pipe(gulp.dest('./dist'));
});
