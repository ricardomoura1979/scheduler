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
  return matchIds(state.interviewers, state.days.filter(dayObject => dayObject.name === day)[0].interviewers);
}



module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };