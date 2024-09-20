
SBA 308: JavaScript Fundamentals

Overview
This project implements a simple JavaScript application that processes learner submission data for a course. The program calculates and outputs the average score for each learner's assignments based on submission data and checks for late submissions, adjusting the score if necessary. 

Features
Calculate the average score for each learner's assignment submissions.
Identify late submissions and apply a penalty by reducing the score.
Exclude assignments that are not yet due from the calculations.
Handles dummy data including course info, assignment group, and learner submissions.
Project Structure
Main Code:
getLearnerData: A function that processes learner submission data, calculates the score, and returns the result.
Helper Functions:
log: A shorthand for console.log to simplify debugging.
average: A function to calculate the average score based on total scores and possible points.
currentData: Automatically gets the current date to determine if an assignment is overdue.


log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
This will log the processed data and average scores to the console.

Author
Wen Fang (09/19/2024)