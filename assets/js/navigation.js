document.addEventListener('DOMContentLoaded', () => {
    // ---------- BACK BUTTON ----------
    const backButton = document.querySelector('.backButton button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back(); // go back to previous page
        });
    }

    // ---------- NAVIGATION BUTTONS ----------
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navButtons.length > 0) {
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                if (target) {
                    window.location.href = target;
                }
            });
        });
    }
});
