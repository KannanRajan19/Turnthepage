/**
 * Turn The Page Club - Main JavaScript
 * Navigation, animations, and interactions
 */

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initStatCounters();
    initSmoothScroll();
    setActiveNavLink();
    initHeroImageToggle();
});

// ============================================
// Mobile Navigation
// ============================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (!navToggle || !nav) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        nav.classList.toggle('open');
        body.classList.toggle('nav-open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.classList.remove('open');
            body.classList.remove('nav-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('open') &&
            !nav.contains(e.target) &&
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            nav.classList.remove('open');
            body.classList.remove('nav-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            navToggle.classList.remove('active');
            nav.classList.remove('open');
            body.classList.remove('nav-open');
        }
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// Set Active Navigation Link
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .section, .stat-item, .timeline-item');

    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Stats Counter Animation
// ============================================
function initStatCounters() {
    // Counters are triggered by scroll animation
}

function animateStatNumber(statItem) {
    const numberEl = statItem.querySelector('.stat-number');
    if (!numberEl || numberEl.dataset.animated) return;

    const targetNumber = parseInt(numberEl.textContent.replace(/[^0-9]/g, ''));
    const suffix = numberEl.textContent.replace(/[0-9]/g, '');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    let step = 0;

    numberEl.dataset.animated = 'true';
    numberEl.classList.add('counting');

    const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), targetNumber);
        numberEl.textContent = current.toLocaleString() + suffix;

        if (step >= steps) {
            clearInterval(timer);
            numberEl.textContent = targetNumber.toLocaleString() + suffix;
            numberEl.classList.remove('counting');
        }
    }, duration / steps);
}

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Testimonial Carousel (if needed)
// ============================================
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.testimonial-card');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'slide-in-left', 'slide-in-right');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('slide-in-right');
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('slide-in-left');
        showSlide(currentSlide);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100));

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Add page transition class
    const main = document.querySelector('main');
    if (main) {
        main.classList.add('page-transition');
    }
});

// ============================================
// Accessibility: Focus Management
// ============================================
document.addEventListener('keydown', function(e) {
    // Add visible focus ring when using keyboard
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
});

// ============================================
// Hero Image Toggle Animation
// ============================================
function initHeroImageToggle() {
    const heroImages = document.querySelectorAll('.hero-image');
    if (!heroImages.length) return;

    let currentIndex = 0;

    setInterval(() => {
        // Remove active class from current image
        heroImages[currentIndex].classList.remove('active');

        // Move to next image
        currentIndex = (currentIndex + 1) % heroImages.length;

        // Add active class to next image
        heroImages[currentIndex].classList.add('active');
    }, 2000); // Toggle every 2 seconds
}

// ============================================
// Export functions for use in other scripts
// ============================================
window.TurnThePage = {
    debounce,
    throttle,
    isInViewport,
    animateStatNumber
};
