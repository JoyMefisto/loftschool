var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
	babel = require('gulp-babel'),
	gutil = require('gulp-util'),
    rename = require('gulp-rename'),
	sourse = require('vinyl-source-stream');

gulp.task('browserify', function() {

	return browserify('js/main.js')
		.bundle()
		.on('error', function(e) {
			gutil.log(e);
		})
		.pipe(sourse('bundle.js'))
		.pipe(gulp.dest('./js'));
});
 
gulp.task('js', function() {
	return gulp.src('./js/modulesES6.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(rename('modulesES5.js'))
		.pipe(gulp.dest('js'))
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

gulp.task('watch', ['js','browser-sync' ,'browserify'], function() {
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('js/*.js', ['js', 'browserify']);
});
