var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

// Jade to html
gulp.task('jade', function() {
  return gulp.src('./src/jade/index.jade')
    .pipe(plugins.jade({
      pretty: true,
      locals: require('./local.js')
    }))
    .pipe(gulp.dest('./dist/'));
});

// less to css
gulp.task('less', function() {
  return gulp.src('./src/less/index.less')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less({
      paths: [path.join(__dirname, 'src', 'less', 'includes'),
              path.join(__dirname, 'src', 'less', 'components')]
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

// Static
gulp.task('static', function() {
  return gulp.src('./static/**/*', {
      base: 'static'
    })
    .pipe(gulp.dest('./dist/static/'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/*.jade', './local.js'], ['jade']);
  gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('build', ['jade', 'less', 'static']);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages({
      branch: "master",
      message: "test"
    }));
});

gulp.task('default', ['build', 'watch']);