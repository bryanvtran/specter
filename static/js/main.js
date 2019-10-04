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

    // used for scrolling
    // first add raf shim
    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // scroll function
    function scrollToY(scrollTargetY, speed, easing) {
        // scrollTargetY: the target scrollY property of the window
        // speed: time in pixels per second
        // easing: easing equation to use

        var scrollY = window.scrollY || document.documentElement.scrollTop,
            scrollTargetY = scrollTargetY || 0,
            speed = speed || 2000,
            easing = easing || 'easeOutSine',
            currentTime = 0;

        // min time .1, max time .8 seconds
        var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        var easingEquations = {
                easeOutSine: function (pos) {
                    return Math.sin(pos * (Math.PI / 2));
                },
                easeInOutSine: function (pos) {
                    return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                },
                easeInOutQuint: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 5);
                    }
                    return 0.5 * (Math.pow((pos - 2), 5) + 2);
                }
            };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            var p = currentTime / time;
            var t = easingEquations[easing](p);

            if (p < 1) {
                requestAnimFrame(tick);

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {
                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }

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
                scrollToY(document.querySelector(hash).offsetTop, 1500, 'easeInOutQuint')

                // focus on input if signup
                if (hash === '#signup') {
                    // wait til input is in view before we focus
                    setTimeout(function() {
                        document.querySelector('#mce-EMAIL').focus();
                    }, 1500)
                }
                
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
        return carouselWrapper.firstElementChild;
    }

    function prevElement(element) {
        if (element.previousElementSibling) {
            return element.previousElementSibling;
        }
        return carouselWrapper.lastElementChild;
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