import React, { useState } from 'react';
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
  Select
} from '@chakra-ui/react'
import $api from '../../http';
import { useDispatch } from 'react-redux';
import { addWorkingSlots } from '../../redux/actions/masterAction';


const EventModal = ({ open, setOpen }) => {

  const dispatch = useDispatch()
  const [startScheduleDateTime, setStartScheduleDateTime] = useState(Date.now())
  const [endScheduleDateTime, setEndScheduleDateTime] = useState(Date.now())
  const [serviceItem, setServiceItem] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  const createEvent = () => {

    $api.post('http://localhost:3500/schedules/create', {
      startDateTime: startScheduleDateTime,
      endDateTime: endScheduleDateTime,
      masterId: user.id
    })
      .then(function (response) {
        dispatch(addWorkingSlots(response.data))

      })
      .catch(function (error) {
        console.log(error);
      });

    setOpen(false)
  }


  return (
    <>
      <Modal onClose={() => setOpen(false)} isOpen={open} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить слот</ModalHeader>

          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Выберите дату и время начала работы</FormLabel>
              <Input
                size="md"
                type="datetime-local"
                required
                placeholder="MM/DD/YYYY"
                value={startScheduleDateTime}
                onChange={e => setStartScheduleDateTime(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Выберите дату и время конца работы</FormLabel>
              <Input
                placeholder="Выберите дату и время конца работы"
                size="md"
                type="datetime-local"
                required
                value={endScheduleDateTime}
                onChange={e => setEndScheduleDateTime(e.target.value)}
              />
            </FormControl>
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

          <ModalFooter>
            <Button colorScheme='teal' onClick={() => createEvent()}>Добавить слот</Button>
            <Spacer />
            <Button colorScheme='red' onClick={() => setOpen(false)}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;