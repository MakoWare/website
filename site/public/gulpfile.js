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

//Compile Components
gulp.task('compileComponents', ['js']);


//Test
gulp.task('test', function(){
    console.log("testing");



    return gulp.src('components/home-page/src/home-page.js')
        .pipe($.traceur())
        .pipe(gulp.dest('components/home-page/dist'));

});

//JS
gulp.task('js', function () {
    var folders = getFolders(componentsPath);
    var tasks = folders.map(function(folder) {
        console.log(folder);
        return gulp.src('components/' + folder + '/src/*.js')
            .pipe($.sourcemaps.init())
            .pipe($.traceur())
            .pipe($.concat(folder + '.js'))
            .pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('components/' + folder + '/dist'));
    });

    return merge(tasks);
});

//HTML
gulp.task('html', function () {
    gulp.src('components/home-page/src/home-page.html')
        .pipe($.rename('home-page.local.html'))
        .pipe(gulp.dest('components/home-page/dist'));
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
