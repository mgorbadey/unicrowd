import $api from "../http/"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarComponent from "../components/Calendar/CalendarWeekComponent";
import { getWorkingSlots } from "../redux/actions/masterAction";

export default function MasterCalendar() {
  const dispatch = useDispatch();
  //хардкод id мастера
  const masterId = 1;

  const workingSlots = useSelector((store) => store.master);
  useEffect(() => {
    $api
      .get(`http://localhost:3500/masters/${masterId}/schedules`)
      .then((response) => {
        const workingSlotsData = response.data;
        dispatch(getWorkingSlots(workingSlotsData));
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
