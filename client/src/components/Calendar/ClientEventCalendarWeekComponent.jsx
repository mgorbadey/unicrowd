import React from "react";
import { CheckIcon, CloseIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { useDispatch } from "react-redux";
import { approveClientSlot, deleteClientSlot } from "../../redux/actions/eventAction";
import $api from "../../http";
import { Stack } from "@chakra-ui/react";


export default function ClientEventCalendarWeekComponent({ clientSlot, authUser }) {
  const style = {
    new: 'blue',
    approved: 'pink',
  }
  
  const HoursCalDisp = {
    startHours: new Date(clientSlot.startDateTime).getHours(),
    startMinutes: String(
      new Date(clientSlot.startDateTime).getMinutes()
      ).padStart(2, "0"),
      endHours: new Date(clientSlot.endDateTime).getHours(),
      endMinutes: String(new Date(clientSlot.endDateTime).getMinutes()).padStart(
        2,
        "0"
        ),
      };
      
  const dispatch = useDispatch();

  function approveEvent(e) {
    e.preventDefault()

    $api
      .post(`http://localhost:3500/masters/${clientSlot.masterId}/events/${clientSlot.id}`)
      .then((response) => {
        dispatch(approveClientSlot(clientSlot.id))
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  function deleteEvent(e) {
    e.preventDefault()
    $api
      .delete(`http://localhost:3500/masters/${clientSlot.masterId}/events/${clientSlot.id}`)
      .then((response) => {
        dispatch(deleteClientSlot(clientSlot.id))
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  return (
    <>
      <li
        className={`relative mt-px flex col-start-${clientSlot.weekDay}`}
        style={{ gridRow: `${clientSlot.gridRow} / span ${clientSlot.span}` }}
      >
        <div
          className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-${style[clientSlot.status]}-50 p-2 text-xs leading-5 hover:bg-${style[clientSlot.status]}-100`}
        >
          <p className={`order-1 font-semibold text-${style[clientSlot.status]}-700`}>
            {clientSlot.serviceItemTitle}
          </p>
          <p className={`order-1 font-semibold text-${style[clientSlot.status]}-700`}>
            {clientSlot.clientName}
          </p>
          <Stack spacing={1} direction="row" align="right" justify='space-between'>
          <p className={`text-${style[clientSlot.status]}-500 group-hover:text-${style[clientSlot.status]}-700 py-1`}>
            <time dateTime={clientSlot.startDateTime}>
              {HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-
              {HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}
            </time>
          </p>
          {clientSlot.status==="new" ? (
            <div className="flex flex-col">
            <button
              className="bg-transparent font-bold uppercase text-xs rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={(e)=>approveEvent(e)}
            >
              <CheckIcon w={3} h={5} color='rgb(78, 128, 238)'/>
            </button>
            <button
              className="bg-transparent font-bold uppercase text-xs rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={(e)=>deleteEvent(e)}
            >
              <CloseIcon w={3} h={3} color='rgb(78, 128, 238)'/>
            </button>
            </div>
          ):(
            ""
            )}
            </Stack>
        </div>
      </li>
    </>
  );
}
