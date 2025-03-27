updateBar(`involvement-bar-${teacher.teacherName}`, `involvement-score-${teacher.teacherName}`, averageRatings.teacherInvolvement);
            updateBar(`homework-bar-${teacher.teacherName}`, `homework-score-${teacher.teacherName}`, averageRatings.homework);

            const reviewsList = document.createElement('ul');
            teacher.reviews.forEach(review => {
                const reviewItem = document.createElement('li');
                reviewItem.textContent = `Comment: ${review.comment || 'No comment'}`;
                reviewsList.appendChild(reviewItem);
            });
            teacherDiv.appendChild(reviewsList);
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
