/* ==========================================================================
   AROMA CAFE & RESTAURANT - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navbar Scroll Effect & Mobile Collapse ---
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Toggle navbar shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Auto-close mobile navbar when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });


    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 3. Active Nav Link on Scroll (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.navbar-nav a[href*="${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    });


    // --- 4. Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- 5. Menu Category Filter ---
    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    item.classList.add('animate-fade-in');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    // --- 6. Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contactName');
            const emailInput = document.getElementById('contactEmail');
            const subjectInput = document.getElementById('contactSubject');
            const messageInput = document.getElementById('contactMessage');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '') {
                showFormAlert('Please enter your full name.', 'danger');
                nameInput.focus();
                return;
            }

            if (email === '' || !emailRegex.test(email)) {
                showFormAlert('Please enter a valid email address.', 'danger');
                emailInput.focus();
                return;
            }

            if (message === '') {
                showFormAlert('Please enter your message.', 'danger');
                messageInput.focus();
                return;
            }

            // Success state
            showFormAlert('Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            contactForm.reset();
        });
    }

    function showFormAlert(message, type) {
        if (!formAlert) return;
        formAlert.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show border-0 rounded-4 shadow-sm" role="alert">
                <i class="bi ${type === 'success' ? 'bi-check-circle-fill me-2' : 'bi-exclamation-triangle-fill me-2'}"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }


    // --- 7. Interactive Quick Order Toast / Modal Trigger ---
    window.quickOrder = function(itemName, price) {
        const modalItemName = document.getElementById('modalItemName');
        const modalItemPrice = document.getElementById('modalItemPrice');

        if (modalItemName && modalItemPrice) {
            modalItemName.textContent = itemName;
            modalItemPrice.textContent = price;
            const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
            orderModal.show();
        }
    };

    const confirmOrderForm = document.getElementById('confirmOrderForm');
    if (confirmOrderForm) {
        confirmOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderModalEl = document.getElementById('orderModal');
            const orderModal = bootstrap.Modal.getInstance(orderModalEl);
            if (orderModal) orderModal.hide();

            // Show Toast Notification
            const toastEl = document.getElementById('orderToast');
            if (toastEl) {
                const toast = new bootstrap.Toast(toastEl);
                toast.show();
            }

            confirmOrderForm.reset();
        });
    }

});