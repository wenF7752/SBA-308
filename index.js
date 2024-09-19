/** SBA 308
 *  Wen Fang
 *  09/19/2024
 */
// Helper functions
const log = console.log;
//get the total score in percentage
const average = (scores, total) => (total === 0 ? 0 : scores / total);
// log(average(200, 400));
// Dummy data
// The provided course information.
const CourseInfo = {
  id: 451,
  name: 'Introduction to JavaScript',
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: 'Fundamentals of JavaScript',
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: 'Declare a Variable',
      due_at: '2023-01-25',
      points_possible: 50,
    },
    {
      id: 2,
      name: 'Write a Function',
      due_at: '2023-02-27',
      points_possible: 150,
    },
    {
      id: 3,
      name: 'Code the World',
      due_at: '3156-11-15',
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: '2023-01-25',
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: '2023-02-12',
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: '2023-01-25',
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: '2023-01-24',
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: '2023-03-07',
      score: 140,
    },
  },
];

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  //   log(AssignmentGroup.assignments[0].points_possible);
  //get the learner ID
  let learnerData = [];
  LearnerSubmissions.forEach((learner) => {
    let currentLearner = {};
    const leanerID = learner.learner_id;
    const assignmentID = learner.assignment_id;
    const submissionScore = learner.submission.score;
    const submissionDate = learner.submission.submitted_at;
    const assignmentPossibleScore = AssignmentGroup.assignments.find(
      (assignment) => assignment.id === assignmentID
    ).points_possible;
    const assignmentDueDate = AssignmentGroup.assignments.find(
      (assignment) => assignment.id === assignmentID
    ).due_at;

    learnerData.push({
      leaner_id: learner.learner_id,
      assignment_id: learner.assignment_id,
      avg: 2,
    });
  });
  return learnerData;
}

log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
