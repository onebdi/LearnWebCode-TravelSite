import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = els;    /* Collection of elements */
    this.offsetPercentage = offset;             /* offsetPercentage needed BEFORE createWaypoints()    */
    this.hideInitially();
    this.createWaypoints();                     /* we need to create our waypoints as soon as possible */
  }

  hideInitially() {
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints() {
    var that = this;
    this.itemsToReveal.each(function() {        /* 'each' is a jQuery method - Do something for each */
      var currentItem = this;                   /* 'this' will lose focus in waypoint method .. save it to a variable */
      new Waypoint({
        element: currentItem,                   /* DOM element that we want to watch for as we scroll down the page */
        handler: function() {                   /* what we want to happen when the element is scrolled to */
          $(currentItem).addClass("reveal-item--is-visible");
        },
        offset: that.offsetPercentage     /* top & bottom edges of 'viewport' - 0 & 100 */
      });
    });
  }
}

/*  by default, waypoints doesn't trigger its handler function until 
     the very top of the element in question hits the very top of our viewport */

export default RevealOnScroll;
