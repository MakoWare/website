var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    es6ify = require('es6ify'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-stream');

var componentsPath = "components";


//Default
gulp.task('default', ['build', 'connect'], function () {
    gulp.watch(['components/**/**.*'], ['build']);

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
gulp.task('build', ['js', 'html', 'css', 'vulcanize']);


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
    var folders = getFolders(componentsPath);
    var tasks = folders.map(function(folder) {
        return gulp.src('components/' + folder + '/src/' + folder + '.css')
            .pipe(gulp.dest('components/' + folder + '/dist'));
    });
    return merge(tasks);
});

//Vulcanize
gulp.task('vulcanize', ['html', 'css'], function () {
    var folders = getFolders(componentsPath);
    var tasks = folders.map(function(folder) {
        return gulp.src('components/' + folder + '/dist/' + folder + '.local.html')
            .pipe($.vulcanize({dest: 'components/' + folder + '/dist', inline: true}))
            .pipe($.rename(folder + '.html'))
            .pipe(gulp.dest('components/' + folder + '/dist'));
    });
    return merge(tasks);
});



//Gets component folders
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}
