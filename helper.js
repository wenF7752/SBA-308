// Helper functions
const log = console.log;
//get the total score in percentage
const average = (scores, total) => (total === 0 ? 0 : scores / total);
//get the current date to determine if the assignment is due
const currentData = new Date().toISOString().split('T')[0];

export { currentData, log, average };