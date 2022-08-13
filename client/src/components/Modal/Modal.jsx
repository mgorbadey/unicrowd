import React, { useState } from 'react';
import { DatePicker } from 'react-datepicker'
import { setHours, setMinutes } from 'date-fns';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spacer,
} from '@chakra-ui/react'

const EventModal = ({ open, setOpen }) => {

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  return (
    <>
      <Modal onClose={() => setOpen(false)} isOpen={open} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создать запись</ModalHeader>

          <ModalBody>
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              includeTimes={[
                setHours(setMinutes(new Date(), 0), 17),
                setHours(setMinutes(new Date(), 30), 18),
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17),
              ]}
              dateFormat="MMMM d, yyyy h:mm aa"
            /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' onClick={() => setOpen(false)}>Записаться</Button>
            <Spacer />
            <Button colorScheme='red' onClick={() => setOpen(false)}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventModal;