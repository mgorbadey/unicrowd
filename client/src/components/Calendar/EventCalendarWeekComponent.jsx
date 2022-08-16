import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import $api from '../../http/index'

export default function EventCalendarWeekComponent({ workingSlot }) {
  const HoursCalDisp = {
    startHours: new Date(workingSlot.startDateTime).getHours(),
    startMinutes: String(new Date(workingSlot.startDateTime).getMinutes()).padStart(2, "0"),
    endHours: new Date(workingSlot.endDateTime).getHours(),
    endMinutes: String(new Date(workingSlot.endDateTime).getMinutes()).padStart(2, "0"),
  }

  const [openEvent, setOpenEvent] = useState(false)
  const [eventInfo, setEventInfo] = useState([])
  const [categoryTitle, setCategoryTitle] = useState(null)
  const [select, setSelect] = useState(null)
  const [time, setTime] = useState(null)

  const params = useParams()

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id')

    eventInfo.data.eventInfo.forEach((el) => {
      if (el.id === option) {
        setCategoryTitle(el.serviceItem.title)
      }
    })

    setSelect(option)
  }

  const onChangeTime = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id')

    setTime(option)
  }

  const clientCreateEvent = async (id) => {
    // const userId = JSON.parse(localStorage.getItem('id'))
    // const eventInfo = { masterId: params.id, clientId: userId, serviceItemId: select.id}

    // $api.post('/client/event/schedule', eventInfo)

  }

  const getEventInfo = async () => {

    const event = await $api.get(`http://localhost:3500/masters/${params.id}/events`)

    setEventInfo(event)

  }

  useEffect(() => {
    getEventInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <li
        className={`relative mt-px flex col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
        onClick={() => setOpenEvent(true)}
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

      <Transition.Root show={openEvent} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpenEvent}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
                  <div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Запись на услуги
                      </Dialog.Title>
                      <div className='mt-2 mt-style'>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Название услуги
                        </label>
                        <select
                          name='country'
                          autoComplete='country-name'
                          onChange={onChangeHandler}
                          defaultValue={categoryTitle}
                          className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                        >
                          {eventInfo?.data?.eventInfo.map((el) => (
                            <option key={el.id} id={el.id} value={el.serviceItem.title}>
                              {el.serviceItem.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='mt-2 mt-style'>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Время записи
                        </label>
                        <select
                          name='country'
                          autoComplete='country-name'
                          onChange={onChangeTime}
                          className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                        >
                          {eventInfo?.data?.eventInfo.map((el) => (
                            <option key={el.id} id={el.startDateTime} value={el.startDateTime}>
                              {el.startDateTime.slice(11, 16)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                      onClick={clientCreateEvent}
                    >
                      Записаться
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
