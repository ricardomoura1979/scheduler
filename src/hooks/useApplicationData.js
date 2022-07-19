import { useEffect, useState } from "react";
import axios from "axios";





export default function useApplicationData(props) {

  const getSpotsRemaining = function (state, appointments) {
    console.log(appointments, state)
   const dayObject = state.days.find(day => day.name === state.day); 
   const appointmentIDs = dayObject.appointments;
   let spotsremaining = 0;
   for (let id of appointmentIDs) {
    if (appointments[id].interview === null) {
      spotsremaining++
    }
   }
   return spotsremaining;
  }


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));

    })
  }, []);




  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let spots = getSpotsRemaining(state, appointments)
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return {...day, spots}
      } else {
        return day
      }

    })


    //Within bookInterview, make a PUT request to the /api/appointments/:id endpoint to update the database with the interview data.
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        
        setState({
          ...state,
          appointments,
          days

        });
      });

  };


  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let spots = getSpotsRemaining(state, appointments)
    const days = state.days.map(day => {
      if (day.name === state.day) {
        return {...day, spots}
      } else {
        return day
      }

    })

    return axios.delete(`/api/appointments/${id}`, { appointment })


      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };


  return { state, setDay, bookInterview, cancelInterview }

}
