document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.editorial-row, .editorial-item, .section-title, .narrative-box');
    revealElements.forEach(el => {
        el.style.opacity = '0'; // Initial state
        revealOnScroll.observe(el);
    });

    // SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for sticky nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // NAVBAR GLASS EFFECT ON SCROLL
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '15px 0';
            nav.style.background = 'rgba(5, 5, 5, 0.85)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.background = 'rgba(5, 5, 5, 0.6)';
        }
    });

    // PARALLAX EFFECT ON HERO
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // MOBILE MENU TOGGLE
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksList = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinksList) {
        mobileBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksList.classList.remove('active');
            });
        });
    }

    // HERO STAGGERING ANIMATION
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staggerItems = document.querySelectorAll('.stagger-item');
    if (!prefersReducedMotion) {
        setTimeout(() => {
            staggerItems.forEach(item => item.classList.add('stagger-in'));
        }, 100);
    } else {
        staggerItems.forEach(item => item.classList.add('stagger-in'));
    }

    // CUSTOM INTERACTIVE CURSOR
    // Only deploy on non-touch devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const cursor = document.querySelector('.custom-cursor');
    
    if (!isTouchDevice && cursor && !prefersReducedMotion) {
        document.body.classList.add('has-custom-cursor');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let isCursorActive = false;

        // Track native mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isCursorActive) {
                cursor.classList.add('active');
                isCursorActive = true;
            }
        });

        // Smoothly lerp custom cursor to native mouse coords
        const renderCursor = () => {
            // Lerp factor (higher is faster, 0.2 is very smooth)
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Hover expand effects on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .editorial-row, .stagger-item, .editorial-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    }
});
