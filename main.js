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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature and platform cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .platform-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animated counter for stats
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with K or M suffix
        let display = current;
        if (target >= 1000000) {
            display = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
            display = (current / 1000).toFixed(1) + 'K+';
        } else {
            display = Math.round(current) + '%';
        }
        
        element.textContent = display;
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const value = statNumber.textContent;
            
            let target;
            if (value.includes('M')) {
                target = parseFloat(value) * 1000000;
            } else if (value.includes('K')) {
                target = parseFloat(value) * 1000;
            } else if (value.includes('%')) {
                target = parseFloat(value);
            }
            
            animateCounter(statNumber, target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Mobile menu toggle (if needed in future)
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

// Add loading state to CTA buttons
document.querySelectorAll('.btn-hero-primary, .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.href && !button.href.includes('#')) {
            button.innerHTML = '<span style="opacity: 0.6">Loading...</span>';
        }
    });
});

console.log('SocialSync - AI-Powered Social Media Management Platform loaded successfully!');
