// RUNS SOME FUNCTION AT DESIRED INTERVALS
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

window.onload = function() {
    // AUTOMATED SCROLLING
    let lastScrollPosition = 0;

    window.addEventListener('scroll', debounce(function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        // Scroll to the description container
        if (scrollPosition > 0 && scrollPosition < document.getElementById('project-description').offsetTop && scrollPosition > lastScrollPosition) {
            document.getElementById('scrollDownButton').style.visibility = 'hidden';
            document.getElementById('project-description').scrollIntoView({behavior: "smooth"});
        }
        // Scroll to the top of the page
        else if (scrollPosition > 0 && scrollPosition < document.getElementById('project-description').offsetTop && scrollPosition < lastScrollPosition) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.getElementById('scrollDownButton').style.visibility = 'visible';
        }

        // Update scroll position
        lastScrollPosition = scrollPosition;
    }, 30));

    // Scroll down button
    document.getElementById('scrollDownButton').addEventListener('click', function() {
        document.getElementById('scrollDownButton').style.visibility = 'hidden';
        document.getElementById('project-description').scrollIntoView({ behavior: 'smooth' });
    });
}
