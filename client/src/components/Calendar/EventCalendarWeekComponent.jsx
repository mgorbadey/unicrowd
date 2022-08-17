
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import $api from "../../http/index";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
const moment = require("moment");
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
  Stack
} from '@chakra-ui/react'

export default function EventCalendarWeekComponent({ workingSlot }) {
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


  const { isOpen, onOpen, onClose } = useDisclosure()

  const [openEvent, setOpenEvent] = useState(false)
  const [serviceInfo, setServiceInfo] = useState([])
  const [eventInfo, setEventInfo] = useState([]);
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
  };

  //залогиненный юзер
  const userRole = JSON.parse(localStorage.getItem("user")).role;

  function getWorkingSlotStatus(e) {
    e.preventDefault();
    console.log("hehehe");
    let startDateOnly = moment(workingSlot.startDateForFilter).format(
      "YYYY-MM-DD"
    );
    $api
      .get(
        `http://localhost:3500/masters/${workingSlot.masterId}/schedules/${workingSlot.id}/status?date=${startDateOnly}`
      )
      .then((response) => {
        response.data
          ? deleteWorkingSlot()
          : alert("Нельзя удалить рабочий слот с записями клиентов");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }


  useEffect(() => {
    getEventInfo()
  }, [timeSlotInfo])

  function deleteWorkingSlot() {
    // e.preventDefault();
    $api
      .delete(
        `http://localhost:3500/masters/${workingSlot.masterId}/schedules/${workingSlot.id}`
      )
      .then((response) => {
        console.log("deleted!!!");
        // dispatch(deleteClientSlot(clientSlot.id))
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }


  return (
    <>
      <li
        className={`relative mt-px flex sm:col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
        onClick={userRole === "master" ? null : () => getWorkingSlotsId(workingSlot.id)}
      >
        {/* <Modal onClose={onClose} isOpen={isOpen} isCentered/> */}
        <a
          href='#'
          className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-pink-100'
        >
          <p className='order-1 font-semibold text-pink-700'>Рабочий слот</p>
          <p className='text-pink-500 group-hover:text-pink-700'>
            <time dateTime={workingSlot.startDateTime}>{HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-{HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}</time>
          </p>
        </a>

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

        <a
          href={`/masters/${workingSlot.masterId}/schedules/${workingSlot.id}`}
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-50 p-2 text-xs leading-5 hover:bg-gray-100"
        >
          <p className="order-1 font-semibold text-gray-700">Рабочий слот</p>
          <Stack spacing={9} direction="row" align="center">
            <p className="text-gray-500 group-hover:text-gray-700">
              <time dateTime={workingSlot.startDateTime}>
                {HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-
                {HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}
              </time>
            </p>
            {userRole === "master" ? (
              <div>
                <Button
                  colorScheme="white"
                  size="xxs"
                  onClick={(e) => getWorkingSlotStatus(e)}
                >
                  <DeleteIcon w={4} h={3} color="gray.500" />
                </Button>
                <Button colorScheme="white" size="xxs">
                  <EditIcon w={4} h={3} color="gray.500" />
                </Button>
              </div>
            ) : (
              ""
            )}
          </Stack>
        </a>
      </li>

      <Transition.Root show={openEvent} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenEvent}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Запись на услуги
                      </Dialog.Title>
                      <div className="mt-2 mt-style">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Название услуги
                        </label>
                        <select
                          name="country"
                          autoComplete="country-name"
                          onChange={onChangeHandler}
                          defaultValue={categoryTitle}
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                          {eventInfo?.data?.eventInfo.map((el) => (
                            <option
                              key={el.id}
                              id={el.id}
                              value={el.serviceItem.title}
                            >
                              {el.serviceItem.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-2 mt-style">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Время записи
                        </label>
                        <select
                          name="country"
                          autoComplete="country-name"
                          onChange={onChangeTime}
                          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        >
                          {eventInfo?.data?.eventInfo.map((el) => (
                            <option
                              key={el.id}
                              id={el.startDateTime}
                              value={el.startDateTime}
                            >
                              {el.startDateTime.slice(11, 16)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
  );
}
