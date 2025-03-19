// Main Page Button Listeners (Event Delegation)
if (window.location.pathname.endsWith('index.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded event fired'); // Check if this runs
        const buttonContainer = document.getElementById('button-container');
        console.log('buttonContainer:', buttonContainer); // Check if element is found
        if (buttonContainer) {
            buttonContainer.addEventListener('click', function(event) {
                console.log('Button container clicked'); // Check if click listener works
                console.log('event.target.id:', event.target.id); // Check the ID of the clicked element
                if (event.target.id === 'review-button') {
                    window.location.href = 'review.html';
                } else if (event.target.id === 'schedule-button') {
                    window.location.href = 'schedule.html';
                } else if (event.target.id === 'social-button') {
                    window.location.href = 'social.html';
                }
            });
        }
    });
}
