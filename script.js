document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Handle Navbar scroll background
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            navbar.style.height = '70px';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.85)';
            navbar.style.height = '80px';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech-list');
    const modalMedia = document.getElementById('modal-media');
    const modalFooter = document.getElementById('modal-footer');
    const closeModal = document.querySelector('.close-modal');

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const tech = card.getAttribute('data-tech');
            const img = card.getAttribute('data-img');
            const youtube = card.getAttribute('data-youtube');
            const link = card.getAttribute('data-link');

            // Get tags from the card's existing tags
            const tagsHTML = card.querySelector('.project-tags').innerHTML;

            modalTitle.textContent = title;
            modalDesc.textContent = description;
            modalTech.textContent = tech;
            modalTags.innerHTML = tagsHTML;

            // Handle Media
            modalMedia.innerHTML = '';
            if (youtube) {
                modalMedia.innerHTML = `
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${youtube}?autoplay=1" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                    </div>
                `;
            } else if (img) {
                modalMedia.innerHTML = `<img src="${img}" alt="${title}">`;
            }

            // Handle Footer Links
            modalFooter.innerHTML = '';
            if (link) {
                modalFooter.innerHTML = `<a href="${link}" target="_blank" class="btn primary-btn">Visit Website</a>`;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        modalMedia.innerHTML = ''; // Stop video playback
    };

    closeModal.addEventListener('click', closeProjectModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});