import React from "react";

export default function ClientEventCalendarWeekComponent({ clientSlot }) {
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

  return (
    <>
      <li
        className={`relative mt-px flex col-start-${clientSlot.weekDay}`}
        style={{ gridRow: `${clientSlot.gridRow} / span ${clientSlot.span}` }}
      >
        <a
          href={`/masters/${clientSlot.masterId}/events/${clientSlot.id}`}
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
        >
          <p className="order-1 font-semibold text-pink-700">
            {clientSlot.serviceItemTitle}
          </p>
          <p className="order-1 font-semibold text-pink-700">
            {clientSlot.clientName}
          </p>
          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs  rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            {clientSlot.status}
          </button>
          <p className="text-pink-500 group-hover:text-pink-700">
            <time dateTime={clientSlot.startDateTime}>
              {HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-
              {HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}
            </time>
          </p>
        </a>
      </li>
    </>
  );
}
