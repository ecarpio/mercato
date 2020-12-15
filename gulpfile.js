var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var $           = require('jquery');
var config = {
	node: './node_modules',
};

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Compile and Uglify JS
gulp.task('js', function() {
    return gulp.src([
        config.node + '/jquery/dist/jquery.min.js',
        config.node + '/bootstrap/dist/js/bootstrap.min.js',
        config.node + '/datatables.net/js/jquery.dataTables.min.js',
    ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('app/js/'))
    .pipe(browserSync.stream());    
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series(['sass', 'js'], function() {
    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/**/*.scss", gulp.series('sass'));
    //gulp.watch("app/js/*.js", gulp.series('js'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));