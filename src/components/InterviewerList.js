import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


/*  export default function InterviewerListItem(props) {
  return (
 <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
</section>
  );
}  */
 
export default function InterviewerList(props) {
  let interviewers

  if (props.interviewers) {
  interviewers = props.interviewers.map(interviewer => {
    console.log(interviewer)
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  }
  console.log(props)
 

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );

}
  InterviewerList.propTypes = { 
    interviewers: PropTypes.array.isRequired
  };

