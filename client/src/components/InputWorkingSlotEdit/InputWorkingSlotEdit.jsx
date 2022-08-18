import { CheckIcon } from "@chakra-ui/icons";
import { Button, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import $api from "../../http";
const moment = require("moment");

function InputWorkingSlotEdit({ handleInputOpen, HoursCalDisp, workingSlot }) {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  function onChangeHandlerStart(e) {
    setStartInput(e.target.value);
  }

  function onChangeHandlerEnd(e) {
    setEndInput(e.target.value);
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
        // dispatch(renderAuth())
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
          onChange={(e) => onChangeHandlerStart(e)}
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
