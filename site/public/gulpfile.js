var gulp = require('gulp'),
    es6ify = require('es6ify'),
    $ = require('gulp-load-plugins')();

gulp.task('js', function () {
    gulp.src([
        'components/mako-cube/src/mako-cube.js',
        'components/mako-cube/src/mako-cube.raw.js'
    ])
        .pipe($.plumber())
        .pipe($.browserify({
            add: [ es6ify.runtime ],
            transform: ['es6ify']
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('components/dist'));
});

gulp.task('html', function () {
    gulp.src('components/mako-cube/src/mako-cube.html')
        .pipe($.rename('mako-cube.local.html'))
        .pipe(gulp.dest('components/dist'));
});

gulp.task('css', function () {
    gulp.src('components/mako-cube/src/mako-cube.scss')
        .pipe($.rubySass())
        .pipe($.autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest('components/dist'));
});

gulp.task('vulcanize', function () {
    gulp.src('components/dist/mako-cube.local.html')
        .pipe($.vulcanize({dest: 'components/dist', inline: true}))
        .pipe($.rename('mako-cube.html'))
        .pipe(gulp.dest('components/dist'));
});

gulp.task('copy', function () {
    gulp.src([
        'bower_components/platform/platform.js',
        'bower_components/polymer/polymer*',
        'bower_components/polymer/layout*'
    ])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['js', 'html', 'css', "copy", 'vulcanize']);

gulp.task('default', ['build', 'connect'], function () {
    gulp.watch(['src/*.*js'], ['js']);
    gulp.watch(['src/*.html'], ['html']);
    gulp.watch(['src/*.scss'], ['css']);
    gulp.watch(['bower_components'], ['copy']);
    gulp.watch(['dist/x-gif.local.html', 'dist/x-gif.js', 'dist/x-gif.css'], ['vulcanize']);

    gulp.watch(['index.html', 'dist/**.*', 'demos/**.*'], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });
});

gulp.task('connect', function () {
    $.connect.server({
        root: [__dirname],
        port: 8000,
        livereload: {port: 8001}
    });
});
