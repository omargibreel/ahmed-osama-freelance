document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Form Submit Simulation & WhatsApp Integration
    const form = document.getElementById('consultationForm');
    if (form) {
        const successMessage = document.getElementById('successMessage');
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const userName = document.getElementById('userName').value.trim();
            const userPhone = document.getElementById('userPhone').value.trim();
            const userEmail = document.getElementById('userEmail').value.trim();
            const userDetails = document.getElementById('userDetails').value.trim();

            // Construct the WhatsApp message
            let whatsappMessage = `*طلب استشارة جديد*\n\n`;
            whatsappMessage += `*الاسم:* ${userName}\n`;
            whatsappMessage += `*رقم الهاتف:* ${userPhone}\n`;
            if (userEmail) {
                whatsappMessage += `*البريد الإلكتروني:* ${userEmail}\n`;
            }
            whatsappMessage += `*التفاصيل:*\n${userDetails}`;

            // URL Encode the message properly for WhatsApp (handles Arabic text)
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const targetPhone = "201097032383"; // Number without the '+' sign
            
            // Generate WhatsApp Web API URL
            const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

            // Show loading state briefly to give feedback
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'جاري التحويل...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Open WhatsApp in a new tab
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset form state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                    
                    // Show success feedback message
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            successMessage.classList.add('hidden');
                        }, 5000);
                    }
                }, 800);
            }
        });
    }

    // Scroll Animations - Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Swiper JS Initialization
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }
});