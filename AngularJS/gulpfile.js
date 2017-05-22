var gulp = require('gulp')
var babel = require('gulp-babel');
var concat = require('gulp-concat')
var ngAnnotate = require('gulp-ng-annotate')
var plumber = require('gulp-plumber')

var sourceFiles = ['./module.js', './routes.js', 'controllers/*.js', 'services/*.js'];

gulp.task('js', function () {
    return gulp.src(sourceFiles)
        .pipe(plumber())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./'))
})

gulp.task('watch', ['js'], function () {
    gulp.watch(sourceFiles, ['js'])
})