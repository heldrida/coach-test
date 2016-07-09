var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gulpWebpack = require('gulp-webpack');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var rename = require("gulp-rename");
var jasmine = require('gulp-jasmine');
var KarmaServer = require('karma').Server;

gulp.task("webpack", function() {
    return gulp.src('./app/app.js')
    .pipe(rename('bundle.js'))
    .pipe( gulpWebpack(webpackConfig, webpack) )
    .pipe(gulp.dest('./dist/'));
});

gulp.task("copyIndex", function() {
   return gulp.src('./app/index.html')
   .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {

	gulp.watch('./app/**/*.js', ['testRunner']);
	gulp.watch('./app/**/*.js', ['webpack']);
	gulp.watch('./app/index.html', ['copyIndex']);
	gulp.watch('./src/sass/**/*.scss', ['sass']);

	gulp.watch([
		'./dist/bundle.js',
		'./dist/index.html'
	]).on('change', function () {
		browserSync.reload();
	});

});

// Sass
gulp.task('sass', function () {
    return gulp.src('./src/sass/app.scss')
           .pipe(plumber())
           .pipe(sass())
           .pipe(gulp.dest('./dist/css'))
           .pipe(browserSync.stream());
});

gulp.task('testRunner', function (done) {
  new KarmaServer({
    configFile: __dirname +  '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('serve', ['watch'], function () {

	browserSync.init({
		notify: false,
		server: {
			baseDir: "./dist"
		}
	});

});