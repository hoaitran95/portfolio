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
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 25, 47, 0.95)';
                navbar.style.height = '70px';
                navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
            } else {
                navbar.style.background = 'rgba(10, 25, 47, 0.85)';
                navbar.style.height = '80px';
                navbar.style.boxShadow = 'none';
            }
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
    const modalRole = document.getElementById('modal-role');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-desc');
    const modalResponsibilities = document.getElementById('modal-responsibilities');
    const modalTech = document.getElementById('modal-tech-list');
    const modalMedia = document.getElementById('modal-media');
    const modalFooter = document.getElementById('modal-footer');
    const closeModal = document.querySelector('.close-modal');

    // Enhanced modal dynamic sections
    let youtubeSection, youtubeContainer;

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const role = card.getAttribute('data-role');
            const description = card.getAttribute('data-description');
            const responsibilities = card.getAttribute('data-responsibilities');
            const tech = card.getAttribute('data-tech');
            const img = card.getAttribute('data-img');
            const youtube = card.getAttribute('data-youtube');
            const link = card.getAttribute('data-link');
            const github = card.getAttribute('data-github');
            const diagram = card.getAttribute('data-diagram');

            // Re-fetch dynamic sections
            youtubeSection = document.getElementById('youtube-section');
            youtubeContainer = document.getElementById('modal-youtube-container');
            const respSection = document.getElementById('responsibilities-section');
            const diagramSection = document.getElementById('diagram-section');
            const diagramContainer = document.getElementById('modal-diagram-container');

            // Get tags from card
            const tagsHTML = card.querySelector('.project-tags').innerHTML;

            modalTitle.textContent = title;
            if (modalRole) modalRole.textContent = role || '';
            modalDesc.textContent = description;
            modalTech.textContent = tech;
            modalTags.innerHTML = tagsHTML;

            // Handle Responsibilities
            if (modalResponsibilities) {
                modalResponsibilities.innerHTML = '';
                if (responsibilities) {
                    const respList = responsibilities.split(';');
                    respList.forEach(resp => {
                        if (resp.trim()) {
                            const li = document.createElement('li');
                            li.textContent = resp.trim();
                            modalResponsibilities.appendChild(li);
                        }
                    });
                    if (respSection) respSection.style.display = 'block';
                } else {
                    if (respSection) respSection.style.display = 'none';
                }
            }

            // Handle Diagram
            if (diagramContainer) diagramContainer.innerHTML = '';
            if (diagram) {
                if (diagramSection) diagramSection.style.display = 'block';
                if (diagramContainer) {
                    diagramContainer.innerHTML = `<img src="${diagram}" alt="${title} Architecture" style="width: 100%; border-radius: 8px; margin-top: 10px;">`;
                }
            } else {
                if (diagramSection) diagramSection.style.display = 'none';
            }

            // Handle Media (Fix bug: Show Image)
            modalMedia.innerHTML = '';
            if (img) {
                modalMedia.innerHTML = `<img src="${img}" alt="${title}">`;
            }

            // Handle YouTube Integration
            if (youtubeContainer) youtubeContainer.innerHTML = '';
            if (youtube) {
                if (youtubeSection) youtubeSection.style.display = 'block';
                if (youtubeContainer) {
                    youtubeContainer.innerHTML = `
                        <div class="video-placeholder" onclick="window.open('https://youtube.com/watch?v=${youtube}', '_blank')" title="Watch on YouTube">
                            <img src="https://img.youtube.com/vi/${youtube}/maxresdefault.jpg" alt="Video demo thumbnail">
                            <div class="play-button">
                                <span class="play-icon">▶</span>
                            </div>
                        </div>
                    `;
                }
            } else {
                if (youtubeSection) youtubeSection.style.display = 'none';
            }

            // Handle Footer Links (References)
            modalFooter.innerHTML = '';
            if (link) {
                modalFooter.innerHTML += `<a href="${link}" target="_blank" class="btn primary-btn">Project Website</a>`;
            }
            if (github) {
                modalFooter.innerHTML += `<a href="${github}" target="_blank" class="btn secondary-btn">View on GitHub</a>`;
            }
            if (youtube) {
                modalFooter.innerHTML += `<a href="https://youtube.com/watch?v=${youtube}" target="_blank" class="btn secondary-btn">Watch on YouTube</a>`;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (youtubeContainer) youtubeContainer.innerHTML = ''; // Stop video
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});