import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, FormControl, Input, Select, Stack } from "@chakra-ui/react";
import React from "react";
const timeForCal = ['9:00', '10:00', '11:00', '12:00', '13:00'];

function InputWorkingSlotEdit({handleInputOpen, HoursCalDisp}) {

  function closeInput() {
    handleInputOpen()
  }


  return (
    <Stack spacing={1} direction="row" align="center">
      {/* <FormControl>
        <Select size="xs" placeholder={`${HoursCalDisp.startHours}:${HoursCalDisp.startMinutes}`}>
        {timeForCal.map((el) => <option>{el}</option>)}
        </Select>
      </FormControl>
      <FormControl>
        <Select size="xs" placeholder={`${HoursCalDisp.endHours}:${HoursCalDisp.endMinutes}`}>
          <option>United Arab Emirates</option>
          <option>Nigeria</option>
        </Select>
      </FormControl> */}
      <Input
     placeholder="Select Date and Time"
     size="xs"
     type="time"
    />
          <Input
     placeholder="Select Date and Time"
     size="xs"
     type="time"
    />
      <Button
        colorScheme="white"
        size="xxs"
        onClick={closeInput}
      >
        <CheckIcon w={4} h={3} color="gray.500" />
      </Button>
    </Stack>
  );
}
export default InputWorkingSlotEdit;
