var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src(['./app/assets/styles/**/*.css','./app/assets/scripts/**/*.js'])
  .pipe(modernizr({
    "options": [
      "setClasses"
    ]
  }))
  .pipe(gulp.dest('./app/temp/scripts/'));
});

/* Modernizr has the potential to test browsers for hundreds of different features. 
    So not only SVG support but other things like flexbox or opacity or CSS animations. 
   However, the more features we test for the largeer the modernizr javascript file becomes
    and the more it will slow things down for our visitors */

/* So this gulp modernizr package will let us build our own custom copy of modernizr that only includes 
    the code to test for the certain features we need to test for. So that way our modernizr file 
    will be as small as possible which means our web site will load as quickly as possible.  */

/* How does this package know which features we need to test for? Well we simply point towards our project's css
     and javascript files within gulp src and then we pipe that group of files through the modernizr package.
     It will look at our code and automatically determine which features we need to test for.
     It will generate a nice lightweight custom modernizr javascript file and then we just pipe that resulting 
     file to our destination.  i.e. app\temp\scripts\modernizer.js    */

  /* then add         import "../../temp/scripts/modernizr";        to Vendor.js    */
