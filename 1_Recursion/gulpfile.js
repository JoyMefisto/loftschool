var gulp = require('gulp'),
    browserSync = require('browser-sync'),
	babel = require('gulp-babel');
 
gulp.task('jsES6', function() {
	return gulp.src('ES6/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('ES5'))
    	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: '.'
		},
		notify: false
	});
});

gulp.task('watch', ['jsES6','browser-sync'], function() {
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('ES6/*.js', ['jsES6']);
});
