
import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import $api from '../../http/index'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { deleteClientSlot } from '../../redux/actions/eventAction'
import { deleteWorkingSlots } from '../../redux/actions/masterAction'
import { useDispatch } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Select,
  Stack,
  FormControl
} from '@chakra-ui/react'
import ButtonsEditDeleteWorkingSlot from "../ButtonsEditDeleteWorkingSlot/ButtonsEditDeleteWorkingSlot";
import InputWorkingSlotEdit from "../InputWorkingSlotEdit/InputWorkingSlotEdit";

const moment = require('moment')

export default function EventCalendarWeekComponent({ workingSlot, authUser }) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const HoursCalDisp = {
    startHours: new Date(workingSlot.startDateTime).getHours(),
    startMinutes: String(
      new Date(workingSlot.startDateTime).getMinutes()
    ).padStart(2, "0"),
    endHours: new Date(workingSlot.endDateTime).getHours(),
    endMinutes: String(new Date(workingSlot.endDateTime).getMinutes()).padStart(
      2,
      "0"
    ),
  };


  const [openEvent, setOpenEvent] = useState(false)
  const [eventInfo, setEventInfo] = useState([])
  const [categoryTitle, setCategoryTitle] = useState(null)
  const [select, setSelect] = useState(null)
  const [time, setTime] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [openEventCreate, setOpenEventCreate] = useState(false)
  const [serviceInfo, setServiceInfo] = useState([])
  const [slotId, setSlotId] = useState(null)
  const [slotInfo, setSlotInfo] = useState(null)
  const [timeSlotInfo, setTimeSlotInfo] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [duration, setDuration] = useState(1)
  const [hoursCal, setHoursCal] = useState({})


  const params = useParams();

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

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
    });
    createDateArray(hoursCal.startHours, hoursCal.endHours, duration)
  }



  const onChangeTime = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('value')

    setTime(option);
  };

  const createDateArray = (hoursCalStart, hoursCalEnd, duration) => {
    console.log(hoursCalStart, hoursCalEnd)
    let array = [hoursCalStart]
    // const endDateLength = Number(endDate.slice(0, 2)) - 1

    for (let i = 0; i < hoursCalEnd - hoursCalStart; i++) {
      // if (array[i][0] === '0') {
      //   let secondDate = +array[i][1] + duration
      //   let newDate = array[i].replace(array[i][1], secondDate.toString())
      //   if (newDate === '010:00') {
      //     newDate = '10:00'
      //   }
      //   array.push(newDate)
      // }

      // if (array[i][0] !== '0') {
      //   let secondDate = +array[i].slice(0, 2) + duration
      //   let newDate = array[i].replace(
      //     array[i].slice(0, 2),
      //     secondDate.toString()
      //   )
      //   array.push(newDate)
      // }

      // if (array[i] === endDate) {
      //   break
      // }
      array.push(array[i] + duration)
    }

    setTimeSlotInfo(array)
  }

  const getWorkingSlotsId = async (id) => {
    onOpen()
    setSlotId(id)

    const schedule = await $api.get(
      `http://localhost:3500/masters/${id}/scheduleInfo`
    )

    setSlotInfo(schedule.data.scheduleInfo)
    setStartDate(schedule.data.scheduleInfo.startDateTime)
    // console.log(schedule.data.scheduleInfo.startDateTime)
    // const date = new Date(schedule.data.scheduleInfo.startDateTime)
    console.log(new Date(schedule.data.scheduleInfo.startDateTime), 'fdskfdsf')
    // const date2 = new Date()
    // console.log(date2.getTimezoneOffset(), 'date2')
    setEndTime(schedule.data.scheduleInfo.endDateTime)
    setStartTime(schedule.data.scheduleInfo.startDateTime.slice(11, 16))
    setEndTime(schedule.data.scheduleInfo.endDateTime.slice(11, 16))
    setHoursCal({
      startHours: new Date(schedule.data.scheduleInfo.startDateTime).getHours(),
      startMinutes: String(
        new Date(schedule.data.scheduleInfo.startDateTime).getMinutes()
      ).padStart(2, '0'),
      endHours: new Date(schedule.data.scheduleInfo.endDateTime).getHours(),
      endMinutes: String(new Date(schedule.data.scheduleInfo.endDateTime).getMinutes()).padStart(
        2,
        '0'
      ),
    })
  }

  const clientCreateEvent = async (id) => {
    onClose()
    const userId = JSON.parse(localStorage.getItem('user'))
    console.log(userId)

    const eventInfo = {
      masterId: params.id,
      clientId: userId.id,
      serviceItemId: select,
      startDateTime: new Date(startDate.replace(startDate.slice(11,16), time)),
      startDateForFilter: new Date(moment(startDate.replace(startDate.slice(11,16), time)).format("YYYY-MM-DD")),
    }

    console.log(eventInfo.startDateTime, 'eventInfo.startDateTime')

    const res = await $api.post('/clients/event/schedule', eventInfo)
    console.log(res)
    // dispatch(addWorkingSlots(res.data))

  }

  const getEventInfo = async () => {
    const serviceItemInfo = await $api.get(
      `http://localhost:3500/masters/${params.id}/serviceItemInfo`
    )

    setServiceInfo(serviceItemInfo)
  }

  const [inputOpen, setInputOpen] = useState(false);

  function handleInputOpen() {
    setInputOpen(!inputOpen)
  }

  useEffect(() => {
    getEventInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlotInfo])

  return (
    <>
      <li
        className={`relative mt-px flex col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
        onClick={userRole === 'master' ? null : () => getWorkingSlotsId(workingSlot.id)}

      >
        <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-50 p-2 text-xs leading-5 hover:bg-gray-100">
          <p className="order-1 font-semibold text-gray-700">Рабочий слот</p>
          {!inputOpen ? (
            <Stack spacing={9} direction="row" align="center">
              <p className="text-gray-500 group-hover:text-gray-700">
                <time dateTime={workingSlot.startDateTime}>
                  {HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-
                  {HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}
                </time>
              </p>
              {authUser.role === "master" ? (
                <ButtonsEditDeleteWorkingSlot workingSlot={workingSlot} handleInputOpen={handleInputOpen}/>
              ) : (
                ""
              )}
            </Stack>
          ) : (
            <InputWorkingSlotEdit handleInputOpen={handleInputOpen} HoursCalDisp={HoursCalDisp}/>
          )}
        </div>
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
                <option value={el < 10 ? `0${el}:00` : `${el}:00`}>{`${el}:00`}</option>
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
  );
}
