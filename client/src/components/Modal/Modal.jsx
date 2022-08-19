import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spacer,
  Input,
  FormControl,
  FormLabel,
  Select,
  Flex,
} from '@chakra-ui/react'
import $api from '../../http'
import { useDispatch } from 'react-redux'
import { addWorkingSlots } from '../../redux/actions/masterAction'

const EventModal = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  // const [startScheduleDateTime, setStartScheduleDateTime] = useState(Date.now())
  // const [endScheduleDateTime, setEndScheduleDateTime] = useState(Date.now())
  const [date, setDate] = useState(Date.now())
  const [startTime, setStartTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(Date.now())
  const [serviceItem, setServiceItem] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  const createEvent = () => {
    $api
      .post('http://localhost:3500/schedules/create', {
        // startDateTime: startScheduleDateTime,
        // endDateTime: endScheduleDateTime,
        startDateTime: new Date(`${date}T${startTime}`),
        endDateTime: new Date(`${date}T${endTime}`),
        masterId: user.id,
      })
      .then(function (response) {
        dispatch(addWorkingSlots(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })

    setOpen(false)
  }

  return (
    <>
      <Modal onClose={() => setOpen(false)} isOpen={open} isCentered>
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
            Добавить рабочий слот
          </ModalHeader>

          <ModalBody>
            <FormControl isRequired>
              <FormLabel color='rgb(108, 114, 127)'>Дата</FormLabel>
              <Input
                mb='8px'
                bg='white'
                color='rgb(108, 114, 127)'
                border='2px solid white'
                focusBorderColor='rgb(140, 175, 174)'
                placeholder='Дата'
                size='md'
                type='date'
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <Flex justify='space-around'>
              <FormControl isRequired>
                <FormLabel color='rgb(108, 114, 127)'>Время начала</FormLabel>
                <Input
                  bg='white'
                  color='rgb(108, 114, 127)'
                  border='2px solid white'
                  focusBorderColor='rgb(140, 175, 174)'
                  placeholder='Время начала'
                  size='md'
                  type='time'
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color='rgb(108, 114, 127)'>Время конца</FormLabel>
                <Input
                  bg='white'
                  color='rgb(108, 114, 127)'
                  border='2px solid white'
                  focusBorderColor='rgb(140, 175, 174)'
                  placeholder='Время конца'
                  size='md'
                  type='time'
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </FormControl>
            </Flex>
            {/* <FormControl isRequired>
              <FormLabel>Выберите дату и время начала работы</FormLabel>
              <Input
                size='md'
                type='datetime-local'
                required
                placeholder='Выберите дату и время конца работы'
                value={startScheduleDateTime}
                onChange={(e) => setStartScheduleDateTime(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Выберите дату и время конца работы</FormLabel>
              <Input
                placeholder='Выберите дату и время конца работы'
                size='md'
                type='datetime-local'
                required
                value={endScheduleDateTime}
                onChange={(e) => setEndScheduleDateTime(e.target.value)}
              />
            </FormControl> */}
            {/* <Select 
            placeholder='Услуга'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
            onChange={(e) => setServiceItem(e.target.value)}
          >
            {serviceItems?.map((item) => (
              <option key={item.id} value={serviceItem}>
                {item.title}
              </option>
            ))}
          </Select> */}
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Button
              type='button'
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              w='100px'
              size='md'
              onClick={() => createEvent()}
            >
              Добавить
            </Button>
            <Button
              type='button'
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              w='100px'
              size='md'
              onClick={() => setOpen(false)}
            >
              Отменить
            </Button>

            {/* <Spacer /> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EventModal
