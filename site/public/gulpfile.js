var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    es6ify = require('es6ify'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-stream');

var componentsPath = "components";

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}



//Default
gulp.task('default', ['connect'], function () {
    gulp.watch(['index.html', 'components/**/**.*', 'css/**/**.*', 'js/**/**.*', 'images/**/**.*'], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });
});

//Connect
gulp.task('connect', function () {
    $.connect.server({
        root: [__dirname],
        port: 8002,
        livereload: {port: 2983}
    });
});

//Build
gulp.task('build', ['js', 'html']);


//JS
gulp.task('js', function () {
    var folders = getFolders(componentsPath);
    var tasks = folders.map(function(folder) {
        return gulp.src('components/' + folder + '/src/*.js')
            .pipe($.concat(folder + '.js'))
            .pipe($.traceur())
            .pipe(gulp.dest('components/' + folder + '/dist'));
    });

    return merge(tasks);
});

//HTML
gulp.task('html', function () {
    var folders = getFolders(componentsPath);
    var tasks = folders.map(function(folder) {
        return gulp.src('components/' + folder + '/src/' + folder + '.html')
            .pipe($.rename(folder + '.local.html'))
            .pipe(gulp.dest('components/' + folder + '/dist'));
    });
    return merge(tasks);
});

//CSS
gulp.task('css', function () {
    gulp.src('src/x-gif.scss')
        .pipe($.rubySass())
        .pipe($.autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest('dist'));
});

//Vulcanize
gulp.task('vulcanize', function () {
    gulp.src('components/home-page/dist/home-page.local.html')
        .pipe($.vulcanize({dest: 'components/home-page/dist', inline: true}))
        .pipe($.rename('home-page.html'))
        .pipe(gulp.dest('components/home-page/dist'));
});

//Copy
gulp.task('copy', function () {
    gulp.src([
        'js/platform.js'
    ])
        .pipe(gulp.dest('components/home-page/dist'));
});
