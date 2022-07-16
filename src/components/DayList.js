import React from 'react';
import DayListItem from "components/DayListItem";


export default function DayList(props){

  return(
    <ul>
      {props.days.map(day => <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value} 
      setDay={props.onChange} />)}
    </ul>
  )
}

/* 1. We're creating a function called DayList that takes in a prop called props.
2. We're returning a ul element that contains a map of the days array.
3. The map function is going to return a DayListItem component for each day in the days array.
4. The DayListItem component is going to take in the following props:
  - key: the id of the day
  - name: the name of the day
  - spots: the number of spots available for the day
  - selected: a boolean that determines if the day is selected or not
  - setDay: a function that sets the day
5. The DayListItem component is going to return a li element that contains the name of the day and the number of spots available. */