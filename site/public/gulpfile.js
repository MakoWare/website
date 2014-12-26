var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('default', ['connect'], function () {

    gulp.watch(['index.html', 'components/**/**.*', 'css/**/**.*', 'js/**/**.*', 'images/**/**.*'], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });
});

gulp.task('connect', function () {
    $.connect.server({
        root: [__dirname],
        port: 8002,
        livereload: {port: 2983}
    });
});
