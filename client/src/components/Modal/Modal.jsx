import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Select
} from '@chakra-ui/react'
import $api from '../../http';


const EventModal = ({ open, setOpen }) => {

const [eventDateTime, setEventDateTime] = useState(Date.now())
const [serviceItem, setServiceItem] = useState('')

const createEvent = () => {

  $api.post('http://localhost:3500/events/create', {
    startDateTime: eventDateTime,
    status: 'pending',
    clientId: 1, //хардкод id клиента
    masterId: 1, // хародкод id мастера
    serviceItemId: 1, // хардкод id сервисАйтема
  })
    .then(function (response) {
      console.log(response);
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
          <ModalHeader>Создать запись</ModalHeader>

          <ModalBody>
            <Input
              placeholder="Выберите дату и время"
              size="md"
              type="datetime-local"
              value={eventDateTime}
              onChange={e=>setEventDateTime(e.target.value)}
            />
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
            <Button colorScheme='teal' onClick={() => createEvent()}>Записаться</Button>
            <Spacer />
            <Button colorScheme='red' onClick={() => setOpen(false)}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;