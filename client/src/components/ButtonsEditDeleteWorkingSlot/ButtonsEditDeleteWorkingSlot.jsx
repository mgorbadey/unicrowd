import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import $api from '../../http'
import { deleteWorkingSlots } from '../../redux/actions/masterAction'

function ButtonsEditDeleteWorkingSlot({ workingSlot, handleInputOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  function getWorkingSlotStatus(e) {
    e.preventDefault()
    let startDateOnly = moment(workingSlot.startDateForFilter).format(
      'YYYY-MM-DD'
    )
    $api
      .get(
        `http://localhost:3500/masters/${workingSlot.masterId}/schedules/${workingSlot.id}/status?date=${startDateOnly}`
      )
      .then((response) => {
        response.data ? deleteWorkingSlot() : onOpen()
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }

  function deleteWorkingSlot() {
    $api
      .delete(
        `http://localhost:3500/masters/${workingSlot.masterId}/schedules/${workingSlot.id}`
      )
      .then((response) => {
        dispatch(deleteWorkingSlots(workingSlot.id))
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }

  function openInput() {
    handleInputOpen()
  }

  return (
    <>
      <div className='flex flex-col'>
        <Button colorScheme='white' size='xxs' onClick={(e) => openInput(e)}>
          <EditIcon w={3} h={5} color='gray.500' />
        </Button>
        <Button
          colorScheme='white'
          size='xxs'
          onClick={(e) => getWorkingSlotStatus(e)}
        >
          <DeleteIcon w={3} h={3} color='gray.500' />
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex direction='column' align='center'>
            <ModalBody
              mt='30px'
              style={{
                fontSize: '1.2rem',
                color: 'rgb(98, 97, 95)',
              }}
            >
              Нельзя удалить слот с записями клиентов
            </ModalBody>
            <ModalFooter>
              <Button
                color='rgb(108, 114, 127)'
                cursor='pointer'
                bg='white'
                w='100px'
                size='md'
                mr={3}
                onClick={onClose}
              >
                Понятно
              </Button>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
export default ButtonsEditDeleteWorkingSlot
