// script.js
// Main Page Button Listeners (Event Delegation)
if (window.location.pathname.endsWith('index.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const buttonContainer = document.getElementById('button-container');
        if (buttonContainer) {
            buttonContainer.addEventListener('click', function(event) {
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
// Schedule Page Logic (schedule.html)
if (window.location.pathname.endsWith('schedule.html')) {
    document.addEventListener('DOMContentLoaded', function() {
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
        const scheduleGrid = document.getElementById('schedule-grid');
        const scheduleInfo = document.getElementById('schedule-info');
        let lastHighlightedButton = null;
        // Clear existing buttons (important!)
        scheduleGrid.innerHTML = '';
        for (let row = 0; row < scheduleData.length; row++) {
            for (let col = 0; col < scheduleData[row].length; col++) {
                const schoolClass = scheduleData[row][col];
                const button = document.createElement('button');
                button.textContent = schoolClass ? schoolClass.className : 'Empty';
                button.dataset.row = row; // Store row and col
                button.dataset.col = col;
                if (schoolClass) {
                    button.dataset.className = schoolClass.className;
                    button.dataset.grade = schoolClass.grade;
                    button.dataset.teacher = schoolClass.teacher;
                    button.dataset.absences = schoolClass.absences;
                }
                scheduleGrid.appendChild(button);
            }
        }
        // Event delegation for schedule grid buttons
        scheduleGrid.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                const button = event.target;
                const row = button.dataset.row;
                const col = button.dataset.col;
                const schoolClass = scheduleData[row][col];
                // Deselect the previously highlighted button
                if (lastHighlightedButton) {
                    lastHighlightedButton.classList.remove('highlighted');
                }
                // If the class is not null, highlight the button and show the information
                if (schoolClass) {
                    button.classList.add('highlighted');
                    document.getElementById('class-name').textContent = 'Class: ' + schoolClass.className;
                    document.getElementById('grade').textContent = 'Grade: ' + schoolClass.grade;
                    document.getElementById('teacher').textContent = 'Teacher: ' + schoolClass.teacher;
                    document.getElementById('absences').textContent = 'Absences: ' + schoolClass.absences;
                    scheduleInfo.style.display = 'block';
                    lastHighlightedButton = button;
                } else {
                    // If the class is null, clear the information and hide the info box
                    document.getElementById('class-name').textContent = '';
                    document.getElementById('grade').textContent = '';
                    document.getElementById('teacher').textContent = '';
                    document.getElementById('absences').textContent = '';
                    scheduleInfo.style.display = 'none';
                    lastHighlightedButton = null;
                }
            }
        } );  // Added closing curly brace here
        // Add event listener to schedule back button
        document.getElementById('schedule-back-button').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    });
}
