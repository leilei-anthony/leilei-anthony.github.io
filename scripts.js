document.addEventListener("DOMContentLoaded", () => {
    /**
     * Renders a list of items into a specified container.
     * Each item uses the standard .item-row structure.
     */
    const renderList = (data, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        data.forEach(item => {
            const linkHTML = item.link
                ? `<a href="${item.link}" target="_blank" class="item-link" title="View Project">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                         <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                         <polyline points="15 3 21 3 21 9"></polyline>
                         <line x1="10" y1="14" x2="21" y2="3"></line>
                     </svg>
                   </a>`
                : "";
            const dateHTML = item.date
                ? `<span class="item-date">${item.date}</span>`
                : "";

            container.innerHTML += `
                <div class="item-row">
                    <div class="item-header">
                        <div class="item-title-group">
                            ${linkHTML}
                            <h3>${item.title}</h3>
                        </div>
                        ${dateHTML}
                    </div>
                    <p>${item.desc}</p>
                </div>`;
        });
    };

    // Render all sections from data.js
    renderList(experience, 'experience-list');
    renderList(projects, 'project-list');
    renderList(papers, 'paper-list');
    renderList(leadership, 'leadership-list');
    renderList(stack, 'stack-list');

    /**
     * Email Copy to Clipboard Logic
     * Replaces standard mailto behavior with a modern clipboard interaction.
     */
    const emailBtn = document.getElementById('email-btn');
    const status = document.getElementById('copy-status');
    const emailAddress = "lesteranthonyjr@gmail.com";

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Feedback: Show "(copied!)" text
                status.style.display = "inline";
                
                // Reset feedback after 2 seconds
                setTimeout(() => {
                    status.style.display = "none";
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                // Fallback: If clipboard fails, alert the user or log it
            });
        });
    }

    /**
     * Scroll-spy: highlight the nav link for the section currently in view.
     */
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section[id]');

    if (navLinks.length && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        sections.forEach(section => observer.observe(section));
    }
});