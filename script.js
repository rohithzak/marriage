document.addEventListener('DOMContentLoaded', () => {
    // Target Date: August 23, 2026 IST (Indian Standard Time is UTC +5:30)
    const targetDate = new Date('2026-08-23T00:00:00+05:30').getTime();

    // DOM Elements for Countdown
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Target date has passed
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            
            // Optional: Update text to show wedding is active/begun
            const introEl = document.querySelector('.countdown-intro');
            if (introEl) {
                introEl.innerText = 'The wedding celebration is underway!';
            }
            return;
        }

        // Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        // Display update with zero padding
        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    }

    // Run immediately and then start interval
    updateCountdown();
    setInterval(updateCountdown, 60000); // Check every minute since we only show down to minutes

    // ==========================================================================
    // INTERSECTION OBSERVER FOR PREMIUM SCROLL FADE-INS
    // ==========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));
});
