var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var http = require('http');
var st = require('st');

// Jade to html
gulp.task('jade', function() {
  return gulp.src('./src/jade/index.jade')
    .pipe(plugins.jade({
      pretty: true,
      locals: require('./local.js')
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(plugins.livereload());
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
    .pipe(gulp.dest('./dist/css'))
    .pipe(plugins.livereload());
});

// Static
gulp.task('static', function() {
  return gulp.src('./static/**/*', {
      base: 'static'
    })
    .pipe(gulp.dest('./dist/static/'))
    .pipe(plugins.livereload());
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
      message: "base"
    }));
});

function server(done) {
  http.createServer(
    st({
      path: __dirname + '/dist',
      index: 'index.html',
      cache: false
    })
    ).listen(8888, done);
  console.log("listening on http://localhost:8888");
}

gulp.task('server', ['build'], server);

gulp.task('default', ['build', 'watch']);
