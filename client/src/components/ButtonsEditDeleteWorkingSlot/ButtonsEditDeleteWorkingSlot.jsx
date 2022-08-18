import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import $api from "../../http";
import { deleteWorkingSlots } from "../../redux/actions/masterAction";

function ButtonsEditDeleteWorkingSlot({ workingSlot, handleInputOpen }) {
  const dispatch = useDispatch();

  function getWorkingSlotStatus(e) {
    e.preventDefault();
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

  function deleteWorkingSlot() {
    $api
      .delete(
        `http://localhost:3500/masters/${workingSlot.masterId}/schedules/${workingSlot.id}`
      )
      .then((response) => {
        dispatch(deleteWorkingSlots(workingSlot.id));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  function openInput() {
    handleInputOpen()
  }

  return (
    <div>
      <Button
        colorScheme="white"
        size="xxs"
        onClick={(e) => getWorkingSlotStatus(e)}
      >
        <DeleteIcon w={4} h={3} color="gray.500" />
      </Button>
      <Button
        colorScheme="white"
        size="xxs"
        onClick={(e) => openInput(e)}
      >
        <EditIcon w={4} h={3} color="gray.500" />
      </Button>
    </div>
  );
}
export default ButtonsEditDeleteWorkingSlot;
