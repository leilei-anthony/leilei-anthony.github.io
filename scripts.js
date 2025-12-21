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
                     <i data-lucide="external-link"></i>
                   </a>` 
                : "";

            container.innerHTML += `
                <div class="item-row">
                    <div class="item-header">
                        ${linkHTML}
                        <h3>${item.title}</h3>
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

    // Initialize Lucide icons if the library is loaded
    if (window.lucide) {
        window.lucide.createIcons();
    }
});