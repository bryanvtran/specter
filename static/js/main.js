document.addEventListener('DOMContentLoaded', function(){
    // mailchimp signup form
    const emailForm = document.querySelector('#mc-embedded-subscribe-form');
    const required = document.querySelector('#mce-EMAIL');

    emailForm.addEventListener('submit', function(e) {
        if (required.value && !required.classList.contains('mce_inline_error')) {
            // we good
            // fb track lead
            fbq('track', 'Lead');
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

    const carousel = document.querySelector('.carousel')
    const carouselWrapper = document.querySelector('.carousel__wrapper');
    const images = document.querySelectorAll('.carousel__image');

    images.forEach(function(image, i) {
        image.addEventListener('click', function(e) {
            rotateImage(e.target, i);
        });
    });

    function rotateImage(newImage, i = -1) {
        // remove current center 
        const curImage = document.querySelector('.center');
        curImage.classList.remove('center');

        // make this one the new center
        newImage.classList.add('center');

        if (i === -1) {
            i = 0;
            let child = newImage
            while ((child = child.previousElementSibling) !== null)  {
                i++;
            }
        }

        // shift content over
        if (window.innerWidth <= 768) {
            carouselWrapper.style.transform = `translateX(${-(i-1)*60-40}%)`
        }
        else if (window.innerWidth <= 1080) {
            carouselWrapper.style.transform = `translateX(${-(i-1)*50-25}%)`
        }
        else {
            carouselWrapper.style.transform = `translateX(${-(i-1)*33.33333}%)`
            }
    }

    function nextElement(element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
        return null;
    }

    function prevElement(element) {
        if (element.previousElementSibling) {
            return element.previousElementSibling;
        }
        return null;
    }

    function nextImage() {
        const curImage = document.querySelector('.center');
        const nextImage = nextElement(curImage);
        if (!nextImage) {
            return;
        }
        rotateImage(nextImage);
    }

    function prevImage() {
        const curImage = document.querySelector('.center');
        const prevImage = prevElement(curImage);
        if (!prevImage) {
            return;
        }
        rotateImage(prevImage);
    }

    carousel.addEventListener("touchstart", startTouch, false);
    carousel.addEventListener("touchmove", moveTouch, false);

    // Swipe Up / Down / Left / Right
    let initialX = null;
    let initialY = null;

    function startTouch(e) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    };

    function moveTouch(e) {
        if (initialX === null) {
            return;
        }

        if (initialY === null) {
            return;
        }

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = initialX - currentX;
        const diffY = initialY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
            // swiped left
                nextImage();
            } else {
                // swiped right
                prevImage();
            }
            e.preventDefault();
        }

        initialX = null;
        initialY = null;
    };
});