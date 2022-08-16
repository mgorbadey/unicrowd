import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
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
    const userId = JSON.parse(localStorage.getItem('user'))
    console.log(userId)
    // const eventInfo = { masterId: params.id, clientId: userId, serviceItemId: select.id}

    // $api.post('/client/event/schedule', eventInfo)

  }

  const getEventInfo = async () => {

    const event = await $api.get(`http://localhost:3500/masters/${params.id}/events`)
    console.log(event)

    setEventInfo(event)

  }

  useEffect(() => {
    getEventInfo()
  }, [])

  return (
    <>
      <li
        className={`relative mt-px flex sm:col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
        onClick={onOpen}
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* <Lorem count={2} /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
