var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();       /* Import just the Create method */

gulp.task('watch', function() {

  /* browserSync actually spins up a little web server on our computer */
  browserSync.init({
    notify: false,        /* some browsers have visual notification warning whenever a CSS injection occurs */
    server: {
      baseDir: "app"      /* where index.html lives */
    }
  });

  watch('./app/index.html', function() {
    /* previously:  gulp.start('html'); */
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    /* previously:  gulp.start('styles'); */
    gulp.start('cssInject');
  });

  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });

});

/* When it comes to CSS browserSync can actually inject our latest CSS into the page
   without even forcing a refresh */
/* 2nd arg - dependancies : run by gulp BEFORE running the anonymous function */
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();  
});

/* unlike reload, BrowserSync Inject preserves text selections in HTML!! */