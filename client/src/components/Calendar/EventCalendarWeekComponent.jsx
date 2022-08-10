import React from 'react'

export default function EventCalendarWeekComponent({ workingSlot }) {
  return (
    <>
      <li
        className={`relative mt-px flex sm:col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
      >
        <a
          href='#'
          className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-pink-100'
        >
          <p className='order-1 font-semibold text-pink-700'>Working Slot</p>
          <p className='text-pink-500 group-hover:text-pink-700'>
            <time dateTime={workingSlot.startDateTime}>7:30 AM</time>
          </p>
        </a>
      </li>
    </>
  )
}
