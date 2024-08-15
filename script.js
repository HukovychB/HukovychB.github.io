// SEND MAIL THROUGH THE FORM
function sendMail(event) {
    event.preventDefault();
    var params = {
        from_name : document.getElementById("name").value,
        email_id : document.getElementById("email").value,
        message : document.getElementById("message").value
    }
    emailjs.send("service_isxw6wh", "template_9ppfsmb", params)
        .then(function(res) {
            // IF SENT CORRECTLY
            if (res.status === 200) {
                document.getElementById("email-sent-message").innerHTML = "Sent!";
                document.getElementById("email-sent-message").style.color = "#66FF66";
                document.getElementById("contact-form").reset();
            }
            // IF SOMETHING IS WRONG
            else {
                document.getElementById("email-sent-message").innerHTML = "Something went wrong";
                document.getElementById("email-sent-message").style.color = "#FF6666";
            }
        })
        .catch(function(error) {
            document.getElementById("email-sent-message").innerHTML = "Something went wrong";
            document.getElementById("email-sent-message").style.color = "#FF6666";
        });
}


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
        const cards = document.querySelectorAll('#card-grid .card-style');
        // Scroll to the portfolio container
        if (scrollPosition > 0 && scrollPosition < document.getElementById('portfolio').offsetTop && scrollPosition > lastScrollPosition) {
            document.getElementById('portfolio').scrollIntoView({behavior: "smooth"});
            document.getElementById('container-image').style.animation = "slideInLeftBack 1s ease-out forwards";
            document.getElementById('container-info').style.animation = "slideInRightBack 1s ease-out forwards";
            cards.forEach(card => {
                card.style.animation = "appear 1s ease-out forwards";
            });
        }
        // Scroll to the top of the page
        else if (scrollPosition > 0 && scrollPosition < document.getElementById('portfolio').offsetTop && scrollPosition < lastScrollPosition) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.getElementById('container-image').style.animation = "slideInLeft 1s ease-out forwards";
            document.getElementById('container-info').style.animation = "slideInRight 1s ease-out forwards";
            cards.forEach(card => {
                card.style.animation = "disappear 0.5s ease-out forwards";
            });
        }
        // Scroll to contact
        else if (scrollPosition + window.innerHeight > document.getElementById('portfolio').offsetTop + document.getElementById('portfolio').offsetHeight + 1 && scrollPosition > lastScrollPosition) {
            document.getElementById('contact').scrollIntoView({behavior: "smooth"});
            document.getElementById('contact-form-container').style.animation = "slideInLeft 1s ease-out forwards";
            document.getElementById('contact-photo').style.animation = "slideInRight 1s ease-out forwards";
            cards.forEach(card => {
                card.style.animation = "disappear 0.5s ease-out forwards";
            });
        }
        // Scroll back to portfolio from contact
        else if (scrollPosition != 0 && scrollPosition < lastScrollPosition && scrollPosition < document.getElementById('contact').offsetTop){
            document.getElementById('portfolio').scrollIntoView({behavior: "smooth"});
            document.getElementById('contact-form-container').style.animation = "slideInLeftBack 1s ease-out forwards";
            document.getElementById('contact-photo').style.animation = "slideInRightBack 1s ease-out forwards";
            cards.forEach(card => {
                card.style.animation = "appear 1s ease-out forwards";
            });
        }

        // Update scroll position
        lastScrollPosition = scrollPosition;
    }, 30));

    // FIXES SMALL BUG AT THE BOTTOM OF THE PAGE
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > document.getElementById('contact').offsetTop) {
            document.getElementById('container-image').style.visibility = "hidden";
            document.getElementById('container-info').style.visibility = "hidden";
        }
        else {
            document.getElementById('container-image').style.visibility = "visible";
            document.getElementById('container-info').style.visibility = "visible";
        }
    });

    // MAKES BUTTONS IN THE NAV BAR SHINE CORRECTLY
    window.addEventListener('scroll', function() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Get positions and heights of sections
        const portfolio = document.getElementById('portfolio');
        const contact = document.getElementById('contact');

        const portfolioPositionTop = portfolio.offsetTop;
        const portfolioPositionHeight = portfolio.offsetHeight;
        const contactPositionTop = contact.offsetTop;
        const contactPositionHeight = contact.offsetHeight;

        // Determine the active link
        let activeLink = null;

        if (scrollPosition === 0) {
            activeLink = document.querySelector('.navbar-nav .nav-link[href="#"]');
        }
        else if (scrollPosition >= portfolioPositionTop && scrollPosition < portfolioPositionTop + portfolioPositionHeight) {
            activeLink = document.querySelector('.navbar-nav .nav-link[href="#portfolio"]');
        }
        else if (scrollPosition >= contactPositionTop && scrollPosition < contactPositionTop + contactPositionHeight) {
            activeLink = document.querySelector('.navbar-nav .nav-link[href="#contact"]');
        }

        // Update the active class
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (activeLink) {
            activeLink.classList.add('active');
        }
    });

    // ENSURE ANIMATIONS ARE CORRECT WHEN SCROLLING BY CLICKING NAV BUTTONS
    const cards = document.querySelectorAll('#card-grid .card-style');
    document.querySelector('#home-button').onclick = function() {
        document.getElementById('container-image').style.animation = "slideInLeft 1s ease-out forwards";
        document.getElementById('container-info').style.animation = "slideInRight 1s ease-out forwards";
        document.getElementById('contact-form-container').style.animation = "slideInLeftBack 1s ease-out forwards";
        document.getElementById('contact-photo').style.animation = "slideInRightBack 1s ease-out forwards";
        cards.forEach(card => {
            card.style.animation = "disappear 0.5s ease-out forwards";
        });
    }
    document.querySelector('#portfolio-button').onclick = function() {
        document.getElementById('container-image').style.animation = "slideInLeftBack 1s ease-out forwards";
        document.getElementById('container-info').style.animation = "slideInRightBack 1s ease-out forwards";
        document.getElementById('contact-form-container').style.animation = "slideInLeftBack 1s ease-out forwards";
        document.getElementById('contact-photo').style.animation = "slideInRightBack 1s ease-out forwards";
        cards.forEach(card => {
            card.style.animation = "appear 0.5s ease-out forwards";
        });
    }
    document.querySelector('#contact-button').onclick = function() {
        document.getElementById('contact-form-container').style.animation = "slideInLeft 1s ease-out forwards";
        document.getElementById('contact-photo').style.animation = "slideInRight 1s ease-out forwards";
        document.getElementById('container-image').style.animation = "slideInLeftBack 1s ease-out forwards";
        document.getElementById('container-info').style.animation = "slideInRightBack 1s ease-out forwards";
        cards.forEach(card => {
            card.style.animation = "disappear 0.5s ease-out forwards";
        });
    }
}


