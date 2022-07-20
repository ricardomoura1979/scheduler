import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import 'components/Appointment/styles.scss';


//useVisualMode imported
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY"; 
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"; 
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    transition(SAVING, true);
    props.bookInterview(props.id, interview) 
      .then(() => {
        console.log("XXXXXXXXXXXXXXXXXXX")
        transition(SHOW)

      })
      .catch((error) => {
      console.log("XXXXXXXXXXXXXXXXXXX", error) 
      transition(ERROR_SAVE, true) 
    });

  }


  function destroy() {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  function edit() {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={destroy}
          onEdit={edit}
        />
      )}
      {mode === CREATE &&
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={back}
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          onCancel={back}
          onConfirm={destroy}
          message="Are you sure you would like to delete?"
        />}
      {mode === EDIT &&
        <Form
          name={props.name ? props.name : props.interview.student}
          value={props.value ? props.value : props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Couldn't create appointment"
          onClose={back}
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Couldn't cancel appointment"
          onClose={back}
        />
      }

      

    </article>
  );
}



