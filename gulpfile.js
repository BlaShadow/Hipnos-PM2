var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var gulp_concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var debug = require('gulp-debug');
var inject = require("gulp-inject");

var uglify = require('gulp-uglify');

var jshint = require('gulp-jshint');

var paths = {
  sass: ['scss/**/*.scss']
};

var project = 'www/';

gulp.task('hint',function(){
    var sources = gulp.src([
        project + 'js/modules.js',
        project + 'js/controllers.js',
        project + 'js/app.js',

        project + 'js/services/*.js',
        project + 'js/controllers/*.js',
    ]);

    return sources.pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('min',function(){

    var sources = gulp.src([
        project + 'js/modules.js',
        project + 'js/controllers.js',

        project + 'js/services/*.js',
        project + 'js/controllers/*.js',

        project + 'js/app.js',
    ]);

    return sources
        .pipe(gulp_concat('script.js'))
        .pipe(gulp.dest('www/js/min'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('www/js/min'));
});

gulp.task('prod_inject',function(){

  var target = gulp.src('www/index.html');

  var sources = gulp.src([
      project + 'js/min/script.min.js'
  ],{
      read:false
  });

  return target.pipe(inject(sources,{
            addRootSlash: true,
            ignorePath: 'www/',
        })).pipe(gulp.dest('www/'));
});

gulp.task('dev_script',function(){

    var target = gulp.src('index.html');

    var sources = gulp.src([
            project + 'js/modules.js',
            project + 'js/controllers.js',

            project + 'js/services/*.js',
            project + 'js/controllers/*.js',

            project + 'js/app.js',
        ],{
        read:false
    });

    return target
        .pipe(inject(sources,{
            addRootSlash: true,
        }))
        .pipe(gulp.dest(''));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['sass']);

gulp.task('dev',['hint','dev_script']);

gulp.task('prod',['min','prod_inject']);

gulp.task('prod_min',['min']);

