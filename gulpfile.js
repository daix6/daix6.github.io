var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var http = require('http');
var st = require('st');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Jade to html
gulp.task('jade', function() {
  return gulp.src('./src/jade/index.jade')
    .pipe(plugins.jade({
      pretty: true
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

gulp.task('javascript', function() {
  return browserify('./src/js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(plugins.livereload());
})

// Static
gulp.task('static', function() {
  return gulp.src('./static/**/*', {
      base: 'static'
    })
    .pipe(gulp.dest('./dist/static/'))
    .pipe(plugins.livereload());
});

gulp.task('watch', function() {
  plugins.livereload.listen({ basePath: 'dist' });
  gulp.watch(['./src/jade/**/*.jade', './local.js'], ['jade']);
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./src/js/**/*.js', ['javascript']);
});

gulp.task('build', ['jade', 'less', 'javascript', 'static']);

gulp.task('clean', function(cb) {
  return del([
    'dist/**/**/*',
    '!dist/CNAME'], cb)
});

function server(done) {
  http.createServer(
    st({
      path: __dirname + '/dist',
      index: 'index.html',
      cache: false
    })
  ).listen(8888, done);
  console.log('listening on http://localhost:8888');
}

gulp.task('server', ['build'], server);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages({
      branch: 'master'
    }));
});

gulp.task('default', ['server', 'watch']);
