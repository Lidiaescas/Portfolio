document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME TOGGLE (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const defaultTheme = systemPrefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', defaultTheme);
    }

    // Toggle theme function
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================================================
       2. TYPEWRITER EFFECT
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const phrases = [
        "Multiplataforma (DAM)",
        "en Dynamics Business Central",
        "de Software (Java, Python, JS)",
        "Android / Móvil",
        "Web"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            // Typing text
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle typing logic flow
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of the phrase
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next phrase
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Small pause before next typing starts
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typewriter effect if element exists
    if (typedTextSpan) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       3. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        // Toggle menu open/close
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       4. SKILLS FILTER INTERACTION
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filterValue === 'all') {
                    // Show all cards
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => { card.style.display = 'none'; }, 200);
                    }
                }
            });
        });
    });

    /* ==========================================================================
       5. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once element is shown
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset trigger a bit
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Make sure elements on screen at load are revealed
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('#hero .reveal');
        heroReveals.forEach(el => el.classList.add('active'));
    }, 100);

    /* ==========================================================================
       6. COPY EMAIL TO CLIPBOARD
       ========================================================================== */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyTooltip = document.getElementById('copy-tooltip');
    const emailToCopy = 'lidia.castellanos15@gmail.com';

    if (copyEmailBtn && copyTooltip) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                // Success feedback
                copyTooltip.textContent = '¡Copiado!';
                copyTooltip.classList.add('copied');

                // Reset tooltip text after 2 seconds
                setTimeout(() => {
                    copyTooltip.textContent = 'Copiar';
                    copyTooltip.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar el correo: ', err);
                copyTooltip.textContent = 'Error';
                setTimeout(() => {
                    copyTooltip.textContent = 'Copiar';
                }, 2000);
            });
        });
    }

    /* ==========================================================================
       7. CONTACT FORM DUMMY FEEDBACK
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('message');

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;

            // Simple loading state animation
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Enviando...</span>
                <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
            `;

            // Style spinner rotating inside CSS if needed, or simple timeout simulation
            setTimeout(() => {
                // Show success feedback
                alert(`¡Gracias por tu mensaje, ${nameInput.value}! Tu consulta ha sido simulada correctamente.`);
                
                // Clear fields
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }, 1200);
        });
    }
});
