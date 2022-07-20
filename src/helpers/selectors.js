//iterate an appointment object, return an arra from nested objects with id
/* const matchIds = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
} */

//combine appointments given in the days object in appointments object.
const getAppointmentsForDay = (state, day) => {
  return state.days.filter(dayObject => dayObject.name === day).map(dayObject => dayObject.appointments.map(apptId => state.appointments[apptId]))[0] || [];
}
const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewer = interview.interviewer;
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interviewer] 
  };
  return interviewObj;
}

function getInterviewersForDay(state, day) {
/*   return matchIds(state.interviewers, state.days.filter(dayObject => dayObject.name === day)[0].interviewers); */
console.log(state, day)
const filterDay = state.days.find(dayObject => {
  return dayObject.name === day


})
  console.log(filterDay)
  if (!filterDay) {
    return [];

  }

  const interviewers = filterDay.interviewers.map(appointment => state.interviewers[appointment])
  return interviewers
}



module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };