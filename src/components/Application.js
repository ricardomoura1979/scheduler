// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
// eslint-disable-next-line
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


/* const [day, setDay] = useState("Monday"); */
/* const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
 */
export default function Application(props) {
  /* const [day, setDay] = useState('Monday'); */
  const [days, setDays] = useState([])({
  day: "Monday",
  days: [],
  appointments: {}
});


  useEffect(() => {
    const dayURL = `/api/days`;
    axios.get(dayURL).then(response => {
     /*  console.log(response) */
      setDays([...response.data]) 
    });
  }, []);



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            value={"Monday"}
            onChange={day => console.log(day)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          Object.values(appointments).map(appointment => {
            return (
              <Appointment
                key={appointment.id}
                {...appointment} />
            )
          })
        }
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
