// Test 2

// Main Page Button Listeners
if (window.location.pathname.endsWith('index.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Attach event listeners to main page buttons after the DOM is fully loaded
        document.getElementById('review-button').addEventListener('click', function() {
            // Navigate to the review page when the review button is clicked
            window.location.href = 'review.html';
        });

        document.getElementById('schedule-button').addEventListener('click', function() {
            // Navigate to the schedule page when the schedule button is clicked
            window.location.href = 'schedule.html';
        });

        document.getElementById('social-button').addEventListener('click', function() {
            // Navigate to the social page when the social button is clicked
            window.location.href = 'social.html';
        });
    });
}

// Schedule Page Logic (schedule.html)
if (window.location.pathname.endsWith('schedule.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Define the schedule data array
        const scheduleData = [
            [
                { className: "Math 101", grade: 85, teacher: "Mr. Smith", absences: 2 },
                { className: "English 101", grade: 90, teacher: "Ms. Johnson", absences: 1 },
                null,
                { className: "History 101", grade: 75, teacher: "Mr. Brown", absences: 0 }
            ],
            [
                { className: "Biology 101", grade: 88, teacher: "Mr. White", absences: 3 },
                null,
                { className: "Chemistry 101", grade: 92, teacher: "Ms. Green", absences: 1 },
                { className: "Physics 101", grade: 81, teacher: "Mr. Blue", absences: 0 }
            ],
            [
                null,
                { className: "PE", grade: 95, teacher: "Coach Lee", absences: 0 },
                { className: "Art 101", grade: 78, teacher: "Ms. Pink", absences: 2 },
                { className: "Music 101", grade: 82, teacher: "Mr. Gray", absences: 1 }
            ],
            [
                { className: "Spanish 101", grade: 85, teacher: "Ms. Red", absences: 0 },
                { className: "Math 201", grade: 90, teacher: "Mr. Smith", absences: 4 },
                null,
                null
            ],
            [
                { className: "Computer Science", grade: 92, teacher: "Ms. Black", absences: 1 },
                null,
                { className: "Economics 101", grade: 80, teacher: "Mr. White", absences: 0 },
                { className: "Psychology 101", grade: 76, teacher: "Ms. Green", absences: 0 }
            ],
            [
                { className: "French 101", grade: 85, teacher: "Mr. Brown", absences: 1 },
                { className: "Math 301", grade: 88, teacher: "Mr. Blue", absences: 2 },
                { className: "History 201", grade: 90, teacher: "Ms. Yellow", absences: 0 },
                null
            ],
            [
                { className: "Math 401", grade: 72, teacher: "Ms. Black", absences: 0 },
                null,
                { className: "History 301", grade: 85, teacher: "Ms. White", absences: 3 },
                { className: "Philosophy 101", grade: 90, teacher: "Mr. Gray", absences: 1 }
            ],
            [
                null,
                { className: "Music 201", grade: 78, teacher: "Ms. Red", absences: 0 },
                { className: "Psychology 201", grade: 81, teacher: "Ms. Pink", absences: 0 },
                { className: "Art 201", grade: 87, teacher: "Mr. Blue", absences: 2 }
            ]
        ];

        // Get references to schedule grid and info elements
        const scheduleGrid = document.getElementById('schedule-grid');
        const scheduleInfo = document.getElementById('schedule-info');
        let lastHighlightedButton = null;

        // Loop through schedule data and create buttons
        for (let row = 0; row < scheduleData.length; row++) {
            for (let col = 0; col < scheduleData[row].length; col++) {
                const schoolClass = scheduleData[row][col];
                const button = document.createElement('button');
                button.textContent = schoolClass ? schoolClass.className : 'Empty';
                button.addEventListener('click', () => {
                    // Handle button click event
                    if (button === lastHighlightedButton) {
                        // Deselect if already highlighted
                        button.classList.remove('highlighted');
                        scheduleInfo.style.display = 'none';
                        lastHighlightedButton = null;
                        return;
                    }

                    if (schoolClass === null) {
                        // Clear selection if clicking empty slot
                        if (lastHighlightedButton) {
                            lastHighlightedButton.classList.remove('highlighted');
                        }
                        scheduleInfo.style.display = 'none';
                        lastHighlightedButton = null;
                        return;
                    }

                    if (lastHighlightedButton) {
                        // Reset last highlighted button
                        lastHighlightedButton.classList.remove('highlighted');
                    }

                    // Highlight the selected button and show class info
                    button.classList.add('highlighted');
                    document.getElementById('class-name').textContent = 'Class: ' + schoolClass.className;
                    document.getElementById('grade').textContent = 'Grade: ' + schoolClass.grade;
                    document.getElementById('teacher').textContent = 'Teacher: ' + schoolClass.teacher;
                    document.getElementById('absences').textContent = 'Absences: ' + schoolClass.absences;
                    scheduleInfo.style.display = 'block';
                    lastHighlightedButton = button;
                });
                scheduleGrid.appendChild(button);
            }
        }

        // Add event listener to schedule back button
        document.getElementById('schedule-back-button').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    });
}

// Review Page Logic (review.html)
if (window.location.pathname.endsWith('review.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listener to review back button
        document.getElementById('review-back-button').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        // Add review functionality here (e.g., display a list of classes)
        // For now, we'll just leave it as a basic page
        //In the future, this section will contain code to display class reviews.
        //For example, this could include dynamically creating list items based on review data.
    });
}

// Social Page Logic (social.html)
if (window.location.pathname.endsWith('social.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Add event listener to social back button
        document.getElementById('social-back-button').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        // Add social functionality here (e.g., display social feeds)
        // For now, we'll just leave it as a basic page
        //In the future, this section will contain code to display social feeds.
        //This could include fetching and displaying data from a social media API.
    });
}
