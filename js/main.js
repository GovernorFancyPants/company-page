scroll_fade(document.getElementById('main-nav'), document.getElementById('header').offsetHeight / 2, document.getElementById('header').offsetHeight);

function scroll_fade(fading_element, start_pos, end_pos) {
    window.addEventListener("scroll", function() {
        var offset = window.scrollY,
            alpha = 1;
        if (offset <= start_pos) {
            alpha = 0;
        } else if (offset <= end_pos) {
            alpha = 0 + Math.pow(offset / end_pos, 2);
        }
        a = document.defaultView.getComputedStyle(fading_element, null).getPropertyValue('background-color').match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        fading_element.style.backgroundColor = 'rgba(' + a[1] + ',' + a[2] + ',' + a[3] + ',' + alpha + ')';
    });
}
