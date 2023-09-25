var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    bs = require('browser-sync'),
    rename = require('gulp-rename');


gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
			.pipe(plumber())
			.pipe(sass({ outputStyle: 'compressed' }))
            .on('error', sass.logError)
			.pipe(gulp.dest('./'))
		 	.pipe(bs.reload({ stream: true }))
})

gulp.task('js', function() {
	return gulp.src('js/**/*.js')
			 	.pipe(plumber())
				.pipe(uglify())
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe( bs.reload({ stream: true }))
})

gulp.task('browserSync', function() {
    //watch files
    var files = [
    'js/**/*.js',
    'style.css',
    '*.php'
    ];

    //initialize browsersync
    bs.init(files, {
    //browsersync with a php server
    proxy: "http://wellements.loc",
    notify: false
    });
});

gulp.task('html', function() {
	return gulp.src('*.html')
	           .pipe( bs.reload({ stream: true }));
})

gulp.task('watch', function() {
	gulp.watch('js/**/*.js', ['js']);
	gulp.watch('sass/**/*.scss', ['sass']);
})

 gulp.task('default', ['sass', 'js', 'watch', 'browserSync']);
