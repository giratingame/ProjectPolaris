//import { getApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js'; // Adjust version if needed
import { app } from './firebase-init.js';

/*try {
    const app = getApp();
    console.log("Firebase App is initialized:", app);
} catch (e) {
    console.error("Firebase App initialization check failed:", e.message);
}*/

const getCourseId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    console.log("Course ID from URL:", courseId); // Moved here
    return courseId;
};

const fetchCourseDetails = async (courseId) => {
    try {
        const db = firebase.firestore();
        const courseDoc = await db.collection('courses').doc(courseId).get();
        if (courseDoc.exists) {
            const courseData = courseDoc.data();
            return courseData;
        } else {
            console.log("No such course!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching course details:", error);
        return null;
    }
};

const fetchTeacherReviews = async (courseId) => {
    try {
        const db = firebase.firestore();
        const teachersSnapshot = await db.collection('courses').doc(courseId).collection('Teachers').get();
        // Initialize teacherReviews as an empty array
        let teacherReviews = [];

        for (const teacherDoc of teachersSnapshot.docs) {
            const teacherName = teacherDoc.id;
            const reviewsSnapshot = await teacherDoc.ref.collection('reviews').get();
            const reviews = reviewsSnapshot.docs.map(reviewDoc => reviewDoc.data());
            teacherReviews.push({ teacherName, reviews });
        }
        return teacherReviews;
    } catch (error) {
        console.error("Error fetching teacher reviews:", error);
        return; // Return an empty array in case of an error
    }
};

const displayCourseDetails = (courseData) => {
    if (courseData) {
        document.getElementById('course-title').textContent = courseData.courseName;
        document.getElementById('course-code').textContent = "Course Code: " + courseData.courseCode;
        //document.getElementById('course-description').textContent = courseData.description; WHY DID IT ADD THIS :sob:
        // ... and so on, for other course information
    } else {
         document.getElementById('course-details').textContent = "Course not found";
    }
};

const displayTeacherReviews = (teacherReviews) => {
    const reviewsContainer = document.getElementById('teacher-reviews');
    if (teacherReviews.length > 0) {
        teacherReviews.forEach(teacher => {
            const teacherDiv = document.createElement('div');
            teacherDiv.classList.add('teacher-review');
            teacherDiv.innerHTML = `<h3>${teacher.teacherName}</h3>`;
            const reviewsList = document.createElement('ul');
            teacher.reviews.forEach(review => {
                const reviewItem = document.createElement('li');
                reviewItem.textContent = review.text; // Assuming 'text' field contains the review
                reviewsList.appendChild(reviewItem);
            });
            teacherDiv.appendChild(reviewsList);
            reviewsContainer.appendChild(teacherDiv);
        });
    } else {
        reviewsContainer.textContent = "No reviews found for this course.";
    }
};

const init = async () => {
    const courseId = getCourseId();
    if (courseId) {
        const courseData = await fetchCourseDetails(courseId);
        displayCourseDetails(courseData);

        const teacherReviews = await fetchTeacherReviews(courseId);
        displayTeacherReviews(teacherReviews);
    } else {
        document.getElementById('course-details').textContent = "No course ID provided.";
    }
};

init();
