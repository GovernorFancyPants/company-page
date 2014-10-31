smoothScroll.init({
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    offset: document.getElementById('main-nav').offsetHeight, // Integer. How far to offset the scrolling anchor location in pixels
});

window.addEventListener("scroll", function() {
    fadeHeader(document.getElementById('main-nav'), document.getElementById('header').offsetHeight / 2, document.getElementById('header').offsetHeight);
    slideLogo();
});

function fadeHeader(fading_element, start_pos, end_pos) {
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

// window.addEventListener("click", function() {
//     var el = document.getElementById('alt-logo');
//     var scroll_to = document.getElementById('content').offsetTop;
//     window.scrollTo(0, scroll_to);
//     smoothScroll.animateScroll(
//         toggle, // Node that toggles the animation. ex. document.querySelector('#toggle')
//         anchor, // ID of the anchor to scroll to. ex. '#bazinga'
//         options // Classes and callbacks. Same options as those passed into the init() function.
//     );
// });

// var el = document.getElementById('alt-logo');
// var scroll_to = document.getElementById('content');

// var toggle = document.querySelector('#next-section');
// var options = {
//     speed: 1000,
//     easing: 'easeOutCubic'
// };
// smoothScroll.animateScroll(toggle, '#content', options);