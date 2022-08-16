import React from 'react'

export default function EventCalendarWeekComponent({ workingSlot }) {
  const HoursCalDisp = {
    startHours: new Date(workingSlot.startDateTime).getHours(),
    startMinutes: String(new Date(workingSlot.startDateTime).getMinutes()).padStart(2, "0"),
    endHours: new Date(workingSlot.endDateTime).getHours(),
    endMinutes: String(new Date(workingSlot.endDateTime).getMinutes()).padStart(2, "0"),
  }

  return (
    <>
      <li
        className={`relative mt-px flex col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
      >
        <a
          href={`/masters/${workingSlot.masterId}/schedules/${workingSlot.id}`}
          className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-50 p-2 text-xs leading-5 hover:bg-gray-100'
        >
          <p className='order-1 font-semibold text-gray-700'>Рабочий слот</p>
          <p className='text-gray-500 group-hover:text-gray-700'>
            <time dateTime={workingSlot.startDateTime}>{HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-{HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}</time>
          </p>
        </a>
      </li>
    </>
  )
}
