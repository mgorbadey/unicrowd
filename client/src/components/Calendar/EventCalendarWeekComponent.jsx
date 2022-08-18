import React from 'react'
import { useState, useEffect } from 'react'
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
  useDisclosure,
  Select,
  Stack,
  FormControl,
} from '@chakra-ui/react'
import ButtonsEditDeleteWorkingSlot from '../ButtonsEditDeleteWorkingSlot/ButtonsEditDeleteWorkingSlot'
import InputWorkingSlotEdit from '../InputWorkingSlotEdit/InputWorkingSlotEdit'

const moment = require('moment')

export default function EventCalendarWeekComponent({
  workingSlot,
  authUser,
  send,
  setSend,
}) {
  const HoursCalDisp = {
    startHours: String(new Date(workingSlot.startDateTime).getHours()).padStart(
      2,
      '0'
    ),
    startMinutes: String(
      new Date(workingSlot.startDateTime).getMinutes()
    ).padStart(2, '0'),
    endHours: String(new Date(workingSlot.endDateTime).getHours()).padStart(
      2,
      '0'
    ),
    endMinutes: String(new Date(workingSlot.endDateTime).getMinutes()).padStart(
      2,
      '0'
    ),
  }

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
  const [timeSlotInfo, setTimeSlotInfo] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [duration, setDuration] = useState(0)
  const [hoursCal, setHoursCal] = useState({})

  const params = useParams()

  const createDateArray = (hoursCalObj, durationSelect) => {
    const start = hoursCalObj?.startHours + hoursCalObj?.startMinutes / 60
    const end = hoursCalObj?.endHours + hoursCalObj?.endMinutes / 60
    const array = []
    for (let i = start; i < end - durationSelect; i += durationSelect) {
      array.push(i)
    }
    // console.log('hoursCalStart, hoursCalEnd', hoursCalStart, hoursCalEnd)
    // let array = [hoursCalStart]
    // const endDateLength = Number(endDate.slice(0, 2)) - 1

    // for (let i = 0; i < hoursCalEnd - hoursCalStart; i++) {
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
    // array.push(array[i] + duration)
    // }
    setTimeSlotInfo(array)
  }

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
  }

  useEffect(() => {
    createDateArray(hoursCal, duration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select])

  const onChangeTime = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('value')

    setTime(option)
  }

  const getWorkingSlotsId = async (id) => {
    onOpen()
    setSlotId(id)
    const schedule = await $api.get(
      `http://localhost:3500/masters/${id}/scheduleInfo`
    )

    setSlotInfo(schedule.data.scheduleInfo)
    setStartDate(new Date(schedule.data.scheduleInfo.startDateTime))
    setEndDate(new Date(schedule.data.scheduleInfo.endDateTime))
    // setStartTime(new Date(schedule.data.scheduleInfo.startDateTime).slice(11, 16))
    // setEndTime(schedule.data.scheduleInfo.endDateTime.slice(11, 16))
    setHoursCal({
      startHours: new Date(schedule.data.scheduleInfo.startDateTime).getHours(),
      startMinutes: String(
        new Date(schedule.data.scheduleInfo.startDateTime).getMinutes()
      ).padStart(2, '0'),
      endHours: new Date(schedule.data.scheduleInfo.endDateTime).getHours(),
      endMinutes: String(
        new Date(schedule.data.scheduleInfo.endDateTime).getMinutes()
      ).padStart(2, '0'),
    })
  }

  const clientCreateEvent = async () => {
    onClose()
    setTimeSlotInfo([])

    const eventInfo = {
      masterId: params.id,
      clientId: authUser.id,
      serviceItemId: select,
      durationHours: duration,
      startDateTime: new Date(
        startDate.toString().replace(startDate.toString().slice(16, 21), time)
      ),
      startDateForFilter: new Date(
        moment(
          startDate.toString().replace(startDate.toString().slice(16, 21), time)
        ).format('YYYY-MM-DD')
      ),
    }

    await $api.post('/clients/event/schedule', eventInfo)
    setSend(!send)
    // dispatch(addWorkingSlots(res.data))
  }

  const getEventInfo = async () => {
    const serviceItemInfo = await $api.get(
      `http://localhost:3500/masters/${params.id}/serviceItemInfo`
    )

    setServiceInfo(serviceItemInfo)
  }

  const [inputOpen, setInputOpen] = useState(false)

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
        onClick={
          authUser?.role === 'master'
            ? null
            : () => getWorkingSlotsId(workingSlot.id)
        }
      >
        <div className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-50 p-2 text-xs leading-5 hover:bg-gray-100'>
          <p className='order-1 font-semibold text-gray-700'>Рабочее время</p>
          {!inputOpen ? (
            <Stack
              spacing={9}
              direction='row'
              justify='space-between'
              align='center'
            >
              <p className='text-gray-500 group-hover:text-gray-700'>
                <time dateTime={workingSlot.startDateTime}>
                  {HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-
                  {HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}
                </time>
              </p>
              {authUser.role === 'master' ? (
                <ButtonsEditDeleteWorkingSlot
                  workingSlot={workingSlot}
                  handleInputOpen={handleInputOpen}
                />
              ) : (
                ''
              )}
            </Stack>
          ) : (
            <InputWorkingSlotEdit
              handleInputOpen={handleInputOpen}
              workingSlot={workingSlot}
              HoursCalDisp={HoursCalDisp}
            />
          )}
        </div>
      </li>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign='center'
            mt='20px'
            style={{
              fontSize: '1.5rem',
              color: 'rgb(98, 97, 95)',
            }}
          >
            Запишитесь на услугу
          </ModalHeader>
          <ModalBody>
            <Select
              mb='10px'
              size='md'
              color='rgb(108, 114, 127)'
              border='2px solid white'
              focusBorderColor='rgb(140, 175, 174)'
              bg='white'
              placeholder='Выберите услугу'
              onChange={onChangeHandler}
            >
              {serviceInfo?.data?.serviceItem.map((el) => (
                <option id={el.id} key={el.id} value={el.title}>
                  {el.title}
                </option>
              ))}
            </Select>
            <Select
              size='md'
              color='rgb(108, 114, 127)'
              border='2px solid white'
              focusBorderColor='rgb(140, 175, 174)'
              bg='white'
              placeholder='Выберите время'
              disabled={timeSlotInfo?.length ? false : true}
              onChange={onChangeTime}
            >
              {timeSlotInfo?.map((el) => (
                <option
                  key={el}
                  value={
                    Number.isInteger(el)
                      ? el < 10
                        ? `0${el}:00`
                        : `${el}:00`
                      : el < 10
                      ? `0${Math.trunc(el)}:30`
                      : `${Math.trunc(el)}:30`
                  }
                >
                  {Number.isInteger(el)
                    ? el < 10
                      ? `0${el}:00`
                      : `${el}:00`
                    : el < 10
                    ? `0${Math.trunc(el)}:30`
                    : `${Math.trunc(el)}:30`}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Button
              type='button'
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              w='100px'
              size='md'
              onClick={clientCreateEvent}
            >
              Записаться
            </Button>
            <Button
              type='button'
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              w='100px'
              size='md'
              onClick={(e) => {
                onClose(e)
                setTimeSlotInfo([])
              }}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
