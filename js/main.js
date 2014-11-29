smoothScroll.init({
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: document.getElementById('main-nav').offsetHeight, // Integer. How far to offset the scrolling anchor location in pixels
});

window.addEventListener("scroll", function() {
    fadeInHeader(document.getElementById('main-nav'), document.getElementById('header').offsetHeight / 2, document.getElementById('header').offsetHeight);
    fadeOutLogo(document.getElementById('main-logo'), 0, document.getElementById('header').offsetHeight / 2);
    slideLogo();
    parallax();
});

function fadeInHeader(fading_element, start_pos, end_pos) {
    var offset = window.scrollY,
        alpha = 1;
    if (offset <= start_pos) {
        alpha = 0;
    } else if (offset <= end_pos) {
        alpha = 0 + Math.pow(offset / end_pos, 2);
    }
    a = document.defaultView.getComputedStyle(fading_element, null).getPropertyValue('background-color').match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    fading_element.style.backgroundColor = 'rgba(' + a[1] + ',' + a[2] + ',' + a[3] + ',' + alpha + ')';
}

function fadeOutLogo(fading_element, start_pos, end_pos) {
    var offset = window.scrollY,
        alpha = 0;
    if (offset <= start_pos) {
        alpha = 1;
    } else if (offset <= end_pos) {
        alpha = 1 - Math.pow(offset / end_pos, 2);
    }
    fading_element.style.opacity = alpha;
}

function slideLogo() {
    var el = document.getElementById('alt-logo');
    var asd = document.getElementById('header').offsetHeight / 2;
    if (window.scrollY > asd) {
        el.style.display = 'block';
        el.classList.add('animated');
        el.classList.add('bounceInLeft');
    } else if (window.scrollY < asd) {
        el.style.display = 'none';
    }
}

function parallax() {
    translateY3d(document.getElementById('hero'), -(window.scrollY * 0.0315));
}

var translateY3d = function(elm, value) {
    var translate = 'translate3d(0px,' + value + 'rem, 0px)';
    elm.style['-webkit-transform'] = translate;
    elm.style['-moz-transform'] = translate;
    elm.style['-ms-transform'] = translate;
    elm.style['-o-transform'] = translate;
    elm.style.transform = translate;
};