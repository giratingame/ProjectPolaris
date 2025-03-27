// public/js/index.j
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired on index.html');
    const buttonContainer = document.getElementById('button-container');
    console.log('buttonContainer:', buttonContainer);
    if (buttonContainer) {
        buttonContainer.addEventListener('click', function(event) {
            console.log('Button container clicked');
            console.log('event.target.id:', event.target.id);
            if (event.target.id === 'review-button') {
                console.log('Review button pressed'); // Added console log
                window.location.href = 'review.html';
            } /*else if (event.target.id === 'schedule-button') {
                console.log('Schedule button pressed'); // Added console log
                window.location.href = 'schedule.html';
            } else if (event.target.id === 'social-button') {
                console.log('Social button pressed'); // Added console log
                window.location.href = 'social.html';
            }*/
        });
    }
});
