import { db } from './firebase-init.js';
import { collection, getDocs, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const teacherSelect = document.getElementById('teacher-name');

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' ')); // Decode the parameter
    }

    // Function to populate teacher dropdown
    async function populateTeachers() {
        try {
            // Get the courseId from the URL and decode it
            const courseId = getUrlParameter('courseId');

            if (!courseId) {
                console.error("Course ID not found in URL.");
                return; // Exit if course ID is missing
            }

            const teachersSnapshot = await getDocs(collection(db, "courses", courseId, "Teachers"));
            teachersSnapshot.forEach((doc) => {
                const teacherName = doc.id;
                const option = document.createElement('option');
                option.value = teacherName;
                option.textContent = teacherName;
                teacherSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    }

    // Call populateTeachers on page load.
    populateTeachers();

    submitButton.addEventListener('click', async () => {
        const studentId = document.getElementById('student-id').value;
        const teacherName = teacherSelect.value;
        const rigorScore = parseInt(document.getElementById('rigor-score').value);
        const workloadScore = parseInt(document.getElementById('workload-score').value);
        const involvementScore = parseInt(document.getElementById('involvement-score').value);
        const homeworkScore = parseInt(document.getElementById('homework-score').value);
        const comment = document.getElementById('comment').value;

        // Get the courseId from the URL and decode it
        const courseId = getUrlParameter('courseId');

        // Validation
        if (!studentId || !teacherName || !courseId || isNaN(rigorScore) || isNaN(workloadScore) || isNaN(involvementScore) || isNaN(homeworkScore) || !comment) {
            alert('Please fill in all fields.');
            return;
        }

        if (rigorScore < 1 || rigorScore > 5 || workloadScore < 1 || workloadScore > 5 || involvementScore < 1 || involvementScore > 5 || homeworkScore < 1 || homeworkScore > 5) {
            alert('Scores must be between 1 and 5.');
            return;
        }

        try {
            // Store review in the correct path
            await setDoc(doc(db, "courses", courseId, "Teachers", teacherName, "reviews", studentId), {
                studentId: studentId,
                teacherName: teacherName,
                rigorScore: rigorScore,
                workloadScore: workloadScore,
                involvementScore: involvementScore,
                homeworkScore: homeworkScore,
                comment: comment,
                timestamp: new Date()
            });

            alert('Review submitted successfully!');
            window.location.href = `course-detail.html?courseId=${encodeURIComponent(courseId)}`; // Redirect back to course detail page
        } catch (error) {
            console.error("Error submitting review:", error);
            alert('Error submitting review. Please try again.');
        }
    });
});
