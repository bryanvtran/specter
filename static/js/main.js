document.addEventListener('DOMContentLoaded', function(){
    // mailchimp signup form
    const form = document.querySelector('#mc-embedded-subscribe-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('form submitted');
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
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                    
                });

                // focus on input
                document.querySelector('#mce-EMAIL').focus();
                
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            }
        });
    })

});
