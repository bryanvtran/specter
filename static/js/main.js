document.addEventListener('DOMContentLoaded', function(){
    // mailchimp signup form
    const emailForm = document.querySelector('#mc-embedded-subscribe-form');
    const required = document.querySelector('#mce-EMAIL');

    emailForm.addEventListener('submit', function(e) {
        if (required.value && !required.classList.contains('mce_inline_error')) {
            // we good
        }
        else {
            // focus on element
            required.focus();

            // add error to shake input
            required.classList.add('shake');

            // remove the class after the animation completes
            setTimeout(function() {
                required.classList.remove('shake');
            }, 300);
        }
        return true;
    });

    // scroll
    const elements = document.querySelectorAll('.scroll');
    elements.forEach(function(element) {
        element.addEventListener('click', function(e) {
            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                e.preventDefault();

                // Store hash
                const hash = this.hash;

                // use scroll into view
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth' 
                })

                // focus on input
                document.querySelector('#mce-EMAIL').focus();
                
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            }
        });
    })

});
