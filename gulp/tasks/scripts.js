var gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', function(callback) {
  webpack(require('../../webpack.config'), function(err, stats) {
    if (err) {
      console.log(err.toString());
    }
    console.log("webpack stats:" + stats.toString() );
    callback();
  });
});

/* 2nd argument - anonymous function that will run when webpack completes */

/* we want to make sure that gulp is aware when webpack completes */
/*  we can do this by passing callback into out main task function signature.
    callback - so gulp can be certain that webpack completed */


