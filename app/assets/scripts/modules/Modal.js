import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalButton = $(".modal__close");
    this.events();                                  /* start listening for clicks as soon as the page loads */
  }

  events() {
    // User 'Clicking' the open modal button
    this.openModalButton.click(this.openModal.bind(this));      /* jquery click method */

    // User 'Clicking' the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));    /* bind(this) - stay to what it is currently set to */

    // User 'Pushes' any key press (not just the escape key)
   $(document).keyup(this.keyPressHandler.bind(this));

  }

  keyPressHandler (e) {
    if (e.keyCode == 27) {                                      /* e.keyCode NOT e.keycode  */
      // User 'Pushes' escape key
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass("modal--is-visible");                   /*  this.modal NOT this.Modal  */
    return false;    /* We want to include this because the header element "Get In Touch" button is a link element */
                     /* As the href is '#', the browser will auto scroll to the top of the page. 
                        returning False will prevent the default behaviour of scrolling up. */
  }

  closeModal() {
    /* by the time these methods actually run javascript's this keyword will have been reset 
       to the element that was just clicked on .. use 'bind' keyword as above */
    this.modal.removeClass("modal--is-visible");
    return false; 
  }


  /* Reminder: addClass activates CSS properties we can never do in C# 
               e.g. this.Modal.opacity = 1                                    */

}

export default Modal;