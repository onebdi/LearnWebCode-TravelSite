var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
Rename = require('gulp-rename'),
Del = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',   /* overrides default naming './svg/sprite.css-d675eadb.svg' without .css   */
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

/* delete outdated copies of the sprite graphic alongside the newest copy */
gulp.task('beginClean', function() {
  return Del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

/* Copies the Sprite SVG file */
gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
  .pipe(gulp.dest('./app/assets/images/sprites'));
});

/* Copies & renames the Sprite CSS file */
gulp.task('copySpriteCSS', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(Rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

/* delete app temp sprite folder */
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
  return Del('./app/temp/sprite');
});


  /* [] dependancies - copySpriteCSS will wait UNTIL createSprite has completed (as both are Asynchronous!)  * /
  /* however, you still need to run 'createSprite' (see below) before running 'copySpriteCSS'! */

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);