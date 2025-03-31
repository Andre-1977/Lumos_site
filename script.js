// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Handle cookie notice
const cookieNotice = document.getElementById('cookie-notice');
const acceptCookiesButton = document.getElementById('accept-cookies');

// Check if cookies have been accepted
if (!localStorage.getItem('cookiesAccepted')) {
    cookieNotice.style.display = 'flex';
} else {
    cookieNotice.style.display = 'none';
}

acceptCookiesButton.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieNotice.style.display = 'none';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll event listener for header
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}); 
