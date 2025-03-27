import { initializeApp, getApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getFirestore, doc, getDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';
import { app, db } from './firebase-init.js';

try {
    const initializedApp = getApp();
    console.log("Firebase App is initialized:", initializedApp.name);
} catch (e) {
    console.error("Firebase App initialization check failed:", e.message);
}

const getCourseId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    console.log("Course ID from URL:", courseId);
    return courseId;
};

const fetchCourseDetails = async (courseId) => {
    try {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);

        if (courseSnap.exists()) {
            const courseData = courseSnap.data();
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
        const db = getFirestore(app);
        const courseRef = doc(db, 'courses', courseId);
        const teachersCollection = collection(courseRef, 'Teachers');
        const teachersSnapshot = await getDocs(teachersCollection);
        let teacherReviews = [];

        for (const teacherDoc of teachersSnapshot.docs) {
            const teacherName = teacherDoc.id;
            const reviewsCollection = collection(teacherDoc.ref, 'reviews');
            const reviewsSnapshot = await getDocs(reviewsCollection);
            const reviews = reviewsSnapshot.docs.map(reviewDoc => reviewDoc.data());
            teacherReviews.push({ teacherName, reviews });
        }
        return teacherReviews;
    } catch (error) {
        console.error("Error fetching teacher reviews:", error);
        return [];
    }
};

const displayCourseDetails = (courseData) => {
    if (courseData) {
        document.getElementById('course-title').textContent = courseData.courseName;
        document.getElementById('course-code').textContent = "Course Code: " + courseData.courseCode;
    } else {
        document.getElementById('course-details').textContent = "Course not found";
    }
};

const displayAverageRatings = (averageRatings) => {
    const updateBar = (barId, scoreId, score, maxScore = 5) => {
        const bar = document.getElementById(barId);
        const scoreSpan = document.getElementById(scoreId);
        if (bar && scoreSpan) {
            const average = parseFloat(score.toFixed(1));
            scoreSpan.textContent = isNaN(average) ? '' : average;
            const percentage = (average / maxScore) * 100;
            bar.style.width = `${isNaN(percentage) ? 0 : percentage}%`;
        }
    };

    updateBar('rigor-bar', 'rigor-score', averageRatings.subjectRigor);
    updateBar('workload-bar', 'workload-score', averageRatings.workload);
    updateBar('involvement-bar', 'involvement-score', averageRatings.teacherInvolvement);
    updateBar('homework-bar', 'homework-score', averageRatings.homework);
};

const displayTeacherReviews = (teacherReviews) => {
    const reviewsContainer = document.getElementById('teacher-reviews');
    reviewsContainer.innerHTML = '';

    if (teacherReviews && teacherReviews.length > 0) {
        teacherReviews.forEach(teacher => {
            const teacherDiv = document.createElement('div');
            teacherDiv.classList.add('teacher-review');
            teacherDiv.innerHTML = `<h3>${teacher.teacherName}</h3>`;

            const rigorDiv = document.createElement('div');
            rigorDiv.classList.add('review-category');
            const workloadDiv = document.createElement('div');
            workloadDiv.classList.add('review-category');
            const involvementDiv = document.createElement('div');
            involvementDiv.classList.add('review-category');
            const homeworkDiv = document.createElement('div');
            homeworkDiv.classList.add('review-category');

            rigorDiv.innerHTML = `<span class="detail-label">Subject Rigor:</span> <span id="rigor-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="rigor-bar-${teacher.teacherName}" class="review-bar"></div></div>`;
            workloadDiv.innerHTML = `<span class="detail-label">Workload:</span> <span id="workload-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="workload-bar-${teacher.teacherName}" class="review-bar"></div></div>`;
            involvementDiv.innerHTML = `<span class="detail-label">Teacher Involvement:</span> <span id="involvement-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="involvement-bar-${teacher.teacherName}" class="review-bar"></div></div>`;
            homeworkDiv.innerHTML = `<span class="detail-label">Homework:</span> <span id="homework-score-${teacher.teacherName}"></span><div class="review-bar-container"><div id="homework-bar-${teacher.teacherName}" class="review-bar"></div></div>`;

            teacherDiv.appendChild(rigorDiv);
            teacherDiv.appendChild(workloadDiv);
            teacherDiv.appendChild(involvementDiv);
            teacherDiv.appendChild(homeworkDiv); // Added this line back!

            reviewsContainer.appendChild(teacherDiv);

            const calculateAverage = (ratings) => {
                if (ratings.length === 0) return 0;
                const sum = ratings.reduce((acc, curr) => acc + curr, 0);
                return sum / ratings.length;
            };

            const teacherRatings = {
                subjectRigor: teacher.reviews.map(r => r.subjectRigor).filter(r => r !== undefined),
                workload: teacher.reviews.map(r => r.workload).filter(r => r !== undefined),
                teacherInvolvement: teacher.reviews.map(r => r.teacherInvolvement).filter(r => r !== undefined),
                homework: teacher.reviews.map(r => r.homework).filter(r => r !== undefined)
            };

            const averageRatings = {
                subjectRigor: calculateAverage(teacherRatings.subjectRigor),
                workload: calculateAverage(teacherRatings.workload),
                teacherInvolvement: calculateAverage(teacherRatings.teacherInvolvement),
                homework: calculateAverage(teacherRatings.homework)
            };

            const updateBar = (barId, scoreId, score, maxScore = 5) => {
                const bar = document.getElementById(barId);
                const scoreSpan = document.getElementById(scoreId);

                if (bar && scoreSpan) {
                    const average = parseFloat(score.toFixed(1));
                    scoreSpan.textContent = isNaN(average) ? '' : average;
                    const percentage = (average / maxScore) * 100;

                    if (isNaN(percentage)) {
                        console.error("Percentage is NaN for:", barId, "score:", score);
                        bar.style.width = '0%';
                    } else {
                        bar.style.width = `${percentage}%`;
                        console.log("Updating bar:", barId, "score:", average, "percentage:", percentage);
                    }
                } else {
                    console.error("Bar or score element not found for:", barId);
                }
            };

            updateBar(`rigor-bar-${teacher.teacherName}`, `rigor-score-${teacher.teacherName}`, averageRatings.subjectRigor);
            updateBar(`workload-bar-${teacher.teacherName}`, `workload-score-${teacher.teacherName}`, averageRatings.workload);
            updateBar(`involvement-bar-${teacher.teacherName}`, `involvement-score-${teacher.teacherName}`, averageRatings.teacherInvolvement);
            updateBar(`homework-bar-${teacher.teacherName}`, `homework-score-${teacher.teacherName}`, averageRatings.homework);
        });
    } else {
        reviewsContainer.textContent = "No reviews found for this course.";
    }
};

document.getElementById('back-button').addEventListener('click', function() {
    window.history.back(); // Navigate to the previous page
    // Or, if you want to go to a specific page:
    // window.location.href = 'your-desired-page.html';
});

// Add event listener to the submit review button
document.getElementById('submit-review-button').addEventListener('click', function() {
    // Get the course name from the page (adjust as needed)
    const courseId = document.getElementById('course-title').textContent; // or whatever element holds the course name

    // Encode the course ID for URL safety
    const encodedCourseId = encodeURIComponent(courseId);

    // Redirect to review-submission.html with the courseId as a URL parameter
    window.location.href = `review-submission.html?courseId=${encodedCourseId}`;
});

const init = async () => {
    const courseId = getCourseId();
    if (courseId) {
        const courseData = await fetchCourseDetails(courseId);
        displayCourseDetails(courseData);

        const teacherReviews = await fetchTeacherReviews(courseId);
        displayTeacherReviews(teacherReviews);

        // Calculate average ratings for the course
        let allReviews = [];
        teacherReviews.forEach(teacher => {
            allReviews = allReviews.concat(teacher.reviews);
        });

        const calculateAverage = (ratings) => {
            if (ratings.length === 0) return 0;
            const sum = ratings.reduce((acc, curr) => acc + curr, 0);
            return sum / ratings.length;
        };

        const courseAverageRatings = {
            subjectRigor: calculateAverage(allReviews.map(r => r.subjectRigor).filter(r => r !== undefined)),
            workload: calculateAverage(allReviews.map(r => r.workload).filter(r => r !== undefined)),
            teacherInvolvement: calculateAverage(allReviews.map(r => r.teacherInvolvement).filter(r => r !== undefined)),
            homework: calculateAverage(allReviews.map(r => r.homework).filter(r => r !== undefined))
        };

        displayAverageRatings(courseAverageRatings);
    } else {
        document.getElementById('course-details').textContent = "No course ID provided.";
    }
};

init();
console.log("course-detail.js loading");
