/** SBA 308
 *  Wen Fang
 *  09/19/2024
 */
// Helper functions
const log = console.log;
//get the total score in percentage
const average = (scores, total) => (total === 0 ? 0 : scores / total);
//get the current date to determine if the assignment is due
const currentData = new Date().toISOString().split('T')[0];

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
  //check if the argument is valid
  try {
    if (
      typeof CourseInfo !== 'object' ||
      typeof AssignmentGroup !== 'object' ||
      !Array.isArray(LearnerSubmissions)
    ) {
      //if the argument is invalid, throw an error
      throw new Error('Invalid argument types');
    }
  } catch (error) {
    console.error(error.message);
    return [];
  }
  //   log(AssignmentGroup.assignments[0].points_possible);
  //get the learner ID
  let result = [];

  LearnerSubmissions.forEach((learner) => {
    //check if the learner is already in the result
    const includeId = result.some((data) => data.id === learner.learner_id);
    let currentLearner = {};
    //get all the data needed for the leaner
    const leanerID = learner.learner_id;
    const assignmentID = learner.assignment_id;
    const submissionScore = learner.submission.score;
    const assignmentPossibleScore = AssignmentGroup.assignments.find(
      (assignment) => assignment.id === assignmentID
    ).points_possible;
    const submissionDate = learner.submission.submitted_at;
    const assignmentDueDate = AssignmentGroup.assignments.find(
      (assignment) => assignment.id === assignmentID
    ).due_at;
    const late = submissionDate > assignmentDueDate;
    const notYetDue = assignmentDueDate > currentData;

    const averageScore = average(submissionScore, assignmentPossibleScore);

    //if the leaner is not in the result, add the leanerID and the assignment score and average score
    if (!includeId) {
      //   log('new');
      currentLearner.id = leanerID;
      //  if the assignment is late, reduce the average score by 0.1
      if (late) {
        currentLearner[assignmentID] = averageScore - 0.1;
      } else {
        currentLearner[assignmentID] = averageScore;
      }
      //delete the assignment score if the assignment is not yet due
      if (notYetDue) {
        delete currentLearner[assignmentID];
      }
      currentLearner.avg = averageScore;
      result.push(currentLearner);
    } else {
      //if the leaner is already in the result, update the assignment score and average score
      result.forEach((data) => {
        if (data.id === leanerID) {
          if (late) {
            data[assignmentID] = averageScore - 0.1;
          } else {
            data[assignmentID] = averageScore;
          }
          if (notYetDue) {
            delete data[assignmentID];
          }
          // Calculate the sum of all scores except 'id' and 'avg'
          let totalSubmissionScore = 0;
          let totalPossiblePoints = 0;
          //loop through the AssignmentGroup to get the total submission score and total possible points
          for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
            const assignment = AssignmentGroup.assignments[i];
            // if the assignment is submitted, meaning the assignment is not deleted (not yet due)
            if (data[assignment.id] === undefined) {
              // Skip this iteration if the assignment is not yet due
              continue;
            }
            //get the total submission score by multiplying the assignment score in percentage (90% = 0.9) with the possible points
            totalSubmissionScore +=
              data[assignment.id] * assignment.points_possible;
            //and get the total possible points
            totalPossiblePoints += assignment.points_possible;
          }

          // Update the average score
          data.avg = average(totalSubmissionScore, totalPossiblePoints);
        }
      });
    }
  });

  return result;
}

log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
