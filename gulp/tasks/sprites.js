var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
Rename = require('gulp-rename'),
Del = require('del'),
svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1            /* stops the edges of neighbouring icons bleeding onto the icons edge */
                            /* but also increases the size of the main site-header logo ... albeit by a pixel */
                            /* transform: scale(0.57);    to    transform: scale(0.56);*/
    }
  },
  mode: {
    css: {
      variables: {            /* we want this to return another function namely so we can use two parameters */
        replaceSvgWithPng: function() {
          /* our filter function will select the dynamic sprite variable name, say, sprite.css-d675eadb.svg */
          /* now we just want to do something to it or transform it before we return it */
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',   /* overrides default naming './svg/sprite.css-d675eadb.svg' to drop .css from the name..  */
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

gulp.task('createPngCopy', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

/* Copies the Sprite SVG file */
gulp.task('copySpriteGraphic', ['createPngCopy'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
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

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);