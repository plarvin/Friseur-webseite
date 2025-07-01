document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Smooth Scrolling für Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Schließe das Mobile Menü, wenn es geöffnet ist
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll-Effekt
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    let autoSlideInterval;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        let prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-Slide für Testimonials
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Starte Auto-Slide und pausiere bei Interaktion
    startAutoSlide();
    
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Kontaktformular Validierung
    const contactForm = document.getElementById('appointment-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Name Validierung
            const nameInput = document.getElementById('name');
            const nameError = nameInput.nextElementSibling;
            
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Bitte geben Sie Ihren Namen ein';
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Email Validierung
            const emailInput = document.getElementById('email');
            const emailError = emailInput.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Bitte geben Sie Ihre E-Mail-Adresse ein';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Nachricht Validierung
            const messageInput = document.getElementById('message');
            const messageError = messageInput.nextElementSibling;
            
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Bitte geben Sie eine Nachricht ein';
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            // Wenn das Formular gültig ist, absenden
            if (isValid) {
                // Hier würde normalerweise der Formularversand erfolgen
                alert('Vielen Dank für Ihre Anfrage! Wir melden uns bald bei Ihnen.');
                contactForm.reset();
            }
        });
    }
    
    // Öffnungszeiten Widget - Aktuellen Tag markieren
    function highlightCurrentDay() {
        const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        const today = new Date().getDay();
        const currentDayName = days[today];
        
        document.querySelectorAll('.hours-row').forEach(row => {
            const dayElement = row.querySelector('.day');
            if (dayElement && dayElement.textContent.includes(currentDayName)) {
                row.classList.add('current-day');
                
                // Animation für die aktuelle Uhrzeit
                if (today !== 0) { // Nicht Sonntag
                    const hoursElement = row.querySelector('.hours');
                    if (hoursElement) {
                        hoursElement.style.animation = 'pulse 2s infinite';
                    }
                }
            }
        });
    }
    
    highlightCurrentDay();
    
    // Scroll-Animationen für Sektionen
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initiale Animation setzen
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Einmal beim Laden ausführen
});