import { CheckIcon } from "@chakra-ui/icons";
import { Button, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editWorkingSlots } from "../../redux/actions/masterAction";
import $api from "../../http";
const moment = require("moment");

function InputWorkingSlotEdit({ handleInputOpen, HoursCalDisp, workingSlot }) {
  const [startInput, setStartInput] = useState(`${HoursCalDisp.startHours}:${HoursCalDisp.startMinutes}`);
  const [endInput, setEndInput] = useState(`${HoursCalDisp.endHours}:${HoursCalDisp.endMinutes}`);
  const dispatch = useDispatch();

  function onChangeHandlerStart(e) {
    e.target.value ? 
    setStartInput(e.target.value) :
    setStartInput(startInput)

  }

  function onChangeHandlerEnd(e) {
    e.target.value ? 
    setEndInput(e.target.value) :
    setEndInput(endInput)
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    handleInputOpen();
    let startDateOnly = moment(workingSlot.startDateForFilter).format(
      "YYYY-MM-DD"
    );
    let newStartDateTime = `${startDateOnly} ${startInput}`;
    let newEndDateTime = `${startDateOnly} ${endInput}`;
    let ISOnewStartDateTime = moment(newStartDateTime).toISOString();
    let ISOnewEndDateTime = moment(newEndDateTime).toISOString();
    let newPeriod = {ISOnewStartDateTime, ISOnewEndDateTime}
    console.log(ISOnewStartDateTime, ISOnewEndDateTime);
    $api
      .post(
        `http://localhost:3500/masters/${workingSlot.masterId}/schedules/${workingSlot.id}`,
        {
          startDateTime: ISOnewStartDateTime,
          endDateTime: ISOnewEndDateTime
        }
      )
      .then((response) => {
        console.log(response.data[0])
        dispatch(editWorkingSlots(response.data[0]))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} direction="row" align="center">
        <Input
          placeholder="Select Date and Time"
          size="xs"
          type="time"
          value={`${HoursCalDisp.startHours}:${HoursCalDisp.startMinutes}`}
          onChange={onChangeHandlerStart}
        />
        <Input
          placeholder="Select Date and Time"
          size="xs"
          type="time"
          value={`${HoursCalDisp.endHours}:${HoursCalDisp.endMinutes}`}
          onChange={onChangeHandlerEnd}
        />
        <Button colorScheme="white" size="xxs" type="submit">
          <CheckIcon w={4} h={3} color="gray.500" />
        </Button>
      </Stack>
    </form>
  );
}
export default InputWorkingSlotEdit;
