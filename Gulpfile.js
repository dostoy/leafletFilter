var gulp = require('gulp'); // Require gulp

// Sass dependencies
var sass = require('gulp-sass'); // Compile Sass into CSS
//var minifyCSS = require('gulp-minify-css'); // Minify the CSS

// Minification dependencies
//var minifyHTML = require('gulp-minify-html'); // Minify HTML
var concat = require('gulp-concat'); // Join all JS files together to save space
//var stripDebug = require('gulp-strip-debug'); // Remove debugging stuffs
//var uglify = require('gulp-uglify'); // Minify JavaScript
//var imagemin = require('gulp-imagemin'); // Minify images

// Other dependencies
//var size = require('gulp-size'); // Get the size of the project
var browserSync = require('browser-sync'); // Reload the browser on file changes
//var jshint = require('gulp-jshint'); // Debug JS files
//var stylish = require('jshint-stylish'); // More stylish debugging

// Tasks -------------------------------------------------------------------- >

// Task to compile Sass file into CSS, and minify CSS into build directory
gulp.task('styles', function() {
    gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true,
    }));
});

// Task to minify new or changed HTML pages
gulp.task('html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
        stream: true,
      }));
});

// Task to concat, strip debugging and minify JS files
gulp.task('scripts', function() {
    gulp.src('js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({
        stream: true,
      }));
});

gulp.task('plugins', function() {
    gulp.src('js/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.reload({
        stream: true,
      }));
});


// Serve application
gulp.task('serve', ['styles', 'html', 'scripts', 'plugins'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
});

// Run all Gulp tasks and serve application
gulp.task('default', ['serve'], function() {
  gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('js/*.js',['scripts']);
  gulp.watch('js/plugins/*.js',['plugins']);
  gulp.watch('./*.html',['html']);
});



