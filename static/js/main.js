document.addEventListener('DOMContentLoaded', function(){
    // mailchimp signup form
    const form = document.querySelector('#mc-embedded-subscribe-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('form submitted');
    });
});
