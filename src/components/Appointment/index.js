import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from 'components/Appointment/Form';
import 'components/Appointment/styles.scss';

//useVisualMode imported
import useVisualMode from 'hooks/useVisualMode';

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";


export default function Appointment(props) {
  console.log(props)





  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // Call the props.bookInterview function with the appointment id and interview as arguments from within the save function. Verify that the id and interview values are correct in the console output.
    props.bookInterview(props.id, interview);
    console.log(bookInterview)
  }; 




  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE &&
        <Form 
        
        
        
        
        
        onCancel={back} 
        />}

    </article>
  );
}



