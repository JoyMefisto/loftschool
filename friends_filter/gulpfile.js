let 
	gulp = require('gulp'),
	less  = require('gulp-less'),
	useref  = require('gulp-useref'),
	gulpif  = require('gulp-if'),
	uglify  = require('gulp-uglify'),
	clean  = require('gulp-clean'),
	rename  = require('gulp-rename'),
	browserSync  = require('browser-sync'),
	browserify = require('browserify'),
	minifyCss  = require('gulp-minify-css'),
	autoprefixer  = require('gulp-autoprefixer'),
	babel  = require('gulp-babel'),
	gutil  = require('gulp-util'),
	sourse = require('vinyl-source-stream');
// npm install --save-dev babel-preset-es2015

// serv
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// less -> css
gulp.task('css', function(){  

  return gulp.src('app/less/bem.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 9'], {cascade: true}))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

// ES6 -> ES5
gulp.task('js', function() {
	return gulp.src('./app/js/es6/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		// .pipe(rename('dist.js'))
		.pipe(gulp.dest('app/js/es5'))
    	.pipe(browserSync.reload({stream: true}));
});

// fonts
gulp.task('fonts',function(){
    gulp.src('./app/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'))
   	.pipe(browserSync.reload({stream: true}));
});

// modules 
gulp.task('browserify', function() {

	return browserify('./app/js/es5/api.js')
		.bundle()
		.on('error', function(e) {
			gutil.log(e);
		})
		.pipe(sourse('bundle.js'))
		.pipe(gulp.dest('app/js/'));
});


// Build project in dist
gulp.task('build', ['css', 'js', 'browserify', 'clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('js/*.js', uglify()))
        .pipe(gulpif('css/*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

// Clean dist
gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('default', ['css', 'js', 'browserify', 'browser-sync'], function() {
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/less/**/*.less', ['css']);
  gulp.watch('app/js/**/*.js', [ 'js' , 'browserify']);
});