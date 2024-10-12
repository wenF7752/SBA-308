/** SBA 308
 *  Wen Fang
 *  09/19/2024
 */
import { CourseInfo, AssignmentGroup, LearnerSubmissions } from './data.js';
import { log, average, currentData } from './helper.js';


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
    //create an object to store the current learner data
    let currentLearner = {};
    //check if the learner submission data is valid
    try {
      if (
        typeof learner.learner_id !== 'number' ||
        typeof learner.assignment_id !== 'number' ||
        typeof learner.submission !== 'object' ||
        typeof learner.submission.submitted_at !== 'string' ||
        typeof learner.submission.score !== 'number'
      ) {
        throw new Error('Invalid learner submission data');
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
    // Validate AssignmentGroup properties
    try {
      if (
        typeof AssignmentGroup.id !== 'number' ||
        typeof AssignmentGroup.name !== 'string' ||
        typeof AssignmentGroup.course_id !== 'number' ||
        typeof AssignmentGroup.group_weight !== 'number' ||
        !Array.isArray(AssignmentGroup.assignments)
      ) {
        throw new Error('Invalid AssignmentGroup properties');
      }

      AssignmentGroup.assignments.forEach((assignment) => {
        if (
          typeof assignment.id !== 'number' ||
          typeof assignment.name !== 'string' ||
          typeof assignment.due_at !== 'string' ||
          typeof assignment.points_possible !== 'number' ||
          assignment.points_possible <= 0
        ) {
          throw new Error('Invalid assignment properties in AssignmentGroup');
        }
      });
    } catch (error) {
      console.error(error.message);
      return [];
    }
    //check if the learner is already in the result
    const includeId = result.some((data) => data.id === learner.learner_id);

    //get all the data needed for the leaner
    const leanerID = learner.learner_id;
    const assignmentID = learner.assignment_id;
    const submissionScore = learner.submission.score;
    let assignmentPossibleScore, assignmentDueDate;
    //try to get the assignment possible score and due date, handle the error if the assignment id is not found
    try {
      //if no assignment is found, assignment will be undefined
      const assignment = AssignmentGroup.assignments.find(
        (assignment) => assignment.id === assignmentID
      );
      if (!assignment) {
        //if assignment is undefined, meaning not found, throw an error
        throw new Error(
          `Assignment with ID ${assignmentID} not found in AssignmentGroup`
        );
      }
      //if the assignment is found, get the possible score and due date
      assignmentPossibleScore = assignment.points_possible;
      assignmentDueDate = assignment.due_at;
    } catch (error) {
      console.error(error.message);
      return;
    }
    const submissionDate = learner.submission.submitted_at;
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
