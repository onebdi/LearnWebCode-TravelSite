import $ from 'jquery';

    /*     $(".site-header__menu-icon").click(function() {           jQuery Spaghetti
           console.log("The top-right icon clicked");
           });   */

class MobileMenu {
  constructor() {
    this.siteHeader = $(".site-header");
    this.menuIcon = $(".site-header__menu-icon");
    this.menuContent = $(".site-header__menu-content");
    this.events();           /* call the event method as our object is created */
  }

  /* menuIcon & menuContent are shortcuts. both use jQuery to select the corresponding div */

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));     /* the 2nd this - refers to this.menuIcon! */
  }

  /* if we want the browser to be listening for this event as soon as the page loads we need to 
     manually call this event method as soon as our object is created. */

    /* dynamically add/remove a NEW modifier class on-the-fly .. use Inspect Element */

  toggleTheMenu() {
    this.menuContent.toggleClass("site-header__menu-content--is-visible");  /* chain on jquery method toggleClass */
    this.siteHeader.toggleClass("site-header--is-expanded");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;

  /* this.toggleTheMenu                                 execute toggleTheMenu
     this.toggleTheMenu.bind                            execute toggleTheMenu and re-bind 'this' to another object
     this.menuIcon.click(this.toggleTheMenu.bind(this))  " bind to 'this' instead of 'this.menuIcon'  */