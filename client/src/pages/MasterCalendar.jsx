import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarComponent from "../components/Calendar/CalendarWeekComponent";
const axios = require("axios").default;

export default function MasterCalendar() {
  const dispatch = useDispatch();
  //хардкод id мастера
  const masterId = 1;

  const workingSlots = useSelector((store) => store.master);
  useEffect(() => {
    axios
      .get(`http://localhost:3600/masters/${masterId}/schedules`)
      .then((response) => {
        const workingSlotsData = response.data;
        dispatch({ type: "WORKINGSLOTS", payload: workingSlotsData });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [dispatch]);

  return (
      <CalendarComponent workingSlots={workingSlots}/>
  );
}
