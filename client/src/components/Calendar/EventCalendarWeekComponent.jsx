import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Select } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import $api from '../../http/index'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'


export default function EventCalendarWeekComponent({ workingSlot }) {
  const HoursCalDisp = {
    startHours: new Date(workingSlot.startDateTime).getHours(),
    startMinutes: String(new Date(workingSlot.startDateTime).getMinutes()).padStart(2, "0"),
    endHours: new Date(workingSlot.endDateTime).getHours(),
    endMinutes: String(new Date(workingSlot.endDateTime).getMinutes()).padStart(2, "0"),
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [openEvent, setOpenEvent] = useState(false)
  const [serviceInfo, setServiceInfo] = useState([])
  const [categoryTitle, setCategoryTitle] = useState(null)
  const [select, setSelect] = useState(null)
  const [time, setTime] = useState(null)
  const [slotId, setSlotId] = useState(null)
  const [slotInfo, setSlotInfo] = useState(null)
  const [timeSlotInfo, setTimeSlotInfo] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [duration, setDuration] = useState(1)

  // const HoursCal = {
  //   startHours: new Date(startDate).getHours(),
  //   startMinutes: String(new Date(startDate).getMinutes()).padStart(2, "0"),
  //   endHours: new Date(endDate).getHours(),
  //   endMinutes: String(new Date(endDate).getMinutes()).padStart(2, "0"),
  // }

  const params = useParams()

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id')

    setSelect(option)

    serviceInfo?.data?.serviceItem.forEach((el) => {
      if (el.id === Number(option)) {
        if (el.duration === 60) {
          setDuration(1) 
        }
        if (el.duration === 90) {
          setDuration(1.5)
        }
        if (el.duration === 120) {
          setDuration(2)
        }
      }
    })

    createDateArray(startTime, endTime, duration)
  }

  const onChangeTime = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('value')

    const newDate = startDate.replace(startDate.slice(11,16), option)

    setTime(newDate)
  }

  const createDateArray = (startDate, endDate, duration) => {
    console.log(startDate, endDate)
    let array = [startDate]
    const endDateLength = Number(endDate.slice(0,2)) - 1

    for (let i = 0; i < endDateLength; i++) {
      if (array[i][0] === '0') {
        let secondDate = +array[i][1] + duration
        let newDate = array[i].replace(array[i][1], secondDate.toString())
        if (newDate === '010:00') {
          newDate = '10:00'
        }
        array.push(newDate)
      } 
      
      if (array[i][0] !== '0') {
        let secondDate = +array[i].slice(0,2) + duration
        let newDate = array[i].replace(array[i].slice(0,2), secondDate.toString())
        array.push(newDate)
      }

      if (array[i] === endDate) {
        break
      }
    }

    setTimeSlotInfo(array)
  }

  const getWorkingSlotsId = async (id) => {
    onOpen()
    setSlotId(id)

    const schedule = await $api.get(`http://localhost:3500/masters/${id}/scheduleInfo`)

    setSlotInfo(schedule.data.scheduleInfo)
    setStartDate(schedule.data.scheduleInfo.startDateTime)
    setEndTime(schedule.data.scheduleInfo.endDateTime)
    setStartTime(schedule.data.scheduleInfo.startDateTime.slice(11,16))
    setEndTime(schedule.data.scheduleInfo.endDateTime.slice(11,16))

  }

  const clientCreateEvent = async (id) => {
    onClose()
    const userId = JSON.parse(localStorage.getItem('user'))
    console.log(userId)
    const eventInfo = { masterId: params.id, clientId: userId.id, serviceItemId: select, startDateTime: time}

    $api.post('/client/event/schedule', eventInfo)
  }

  const getEventInfo = async () => {
    const serviceItemInfo = await $api.get(
      `http://localhost:3500/masters/${params.id}/serviceItemInfo`
    )

    setServiceInfo(serviceItemInfo)

  }

  useEffect(() => {
    getEventInfo()
  }, [timeSlotInfo])

  return (
    <>
      <li
        className={`relative mt-px flex sm:col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
        onClick={() => getWorkingSlotsId(workingSlot.id)}
      >
        <a
          href='#'
          className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-pink-100'
        >
          <p className='order-1 font-semibold text-pink-700'>Рабочий слот</p>
          <p className='text-pink-500 group-hover:text-pink-700'>
            <time dateTime={workingSlot.startDateTime}>{HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-{HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}</time>
          </p>
        </a>
      </li>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Запишитесь на услугу</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Select placeholder='Выберите услугу' onChange={onChangeHandler}>
              {serviceInfo?.data?.serviceItem.map((el) => (
                <option id={el.id} value={el.title}>{el.title}</option>
              ))}
            </Select>

            {timeSlotInfo ? <Select placeholder='Выберите время' onChange={onChangeTime}>
              {timeSlotInfo?.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </Select> : null}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={clientCreateEvent}>
              Записаться
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
