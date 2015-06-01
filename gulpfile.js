var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var argv = require('yargs').argv;

gulp.task('browserify', function() {
  var stream = gulp.src('js/app.js')
    .pipe(browserify({ transform: 'babelify', debug: !argv.production }))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(concat('bundle.js'));

  if (argv.production) {
    stream.pipe(uglify());
  }

  stream.pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['default']);
});
