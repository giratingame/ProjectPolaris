import { db } from './firebase-init.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', async () => {
        const studentId = document.getElementById('student-id').value;
        const teacherName = document.getElementById('teacher-name').value; // Retrieve teacher's name
        const rigorScore = parseInt(document.getElementById('rigor-score').value);
        const workloadScore = parseInt(document.getElementById('workload-score').value);
        const involvementScore = parseInt(document.getElementById('involvement-score').value);
        const homeworkScore = parseInt(document.getElementById('homework-score').value);
        const comment = document.getElementById('comment').value;

        // Validate input
        if (!studentId || !teacherName || isNaN(rigorScore) || isNaN(workloadScore) || isNaN(involvementScore) || isNaN(homeworkScore) || !comment) {
            alert('Please fill in all fields.');
            return;
        }

        if (rigorScore < 1 || rigorScore > 5 || workloadScore < 1 || workloadScore > 5 || involvementScore < 1 || involvementScore > 5 || homeworkScore < 1 || homeworkScore > 5) {
            alert('Scores must be between 1 and 5.');
            return;
        }

        try {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "reviews"), {
                studentId: studentId,
                teacherName: teacherName, // Include teacher's name
                rigorScore: rigorScore,
                workloadScore: workloadScore,
                involvementScore: involvementScore,
                homeworkScore: homeworkScore,
                comment: comment,
                timestamp: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            alert('Review submitted successfully!');
            window.location.href = 'course-detail.html';
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Error submitting review. Please try again.');
        }
    });
});
