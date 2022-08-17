import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import $api from "../../http/index";
import { Stack } from "@chakra-ui/react";
import ButtonsEditDeleteWorkingSlot from "../ButtonsEditDeleteWorkingSlot/ButtonsEditDeleteWorkingSlot";
import InputWorkingSlotEdit from "../InputWorkingSlotEdit/InputWorkingSlotEdit";
const moment = require("moment");
// import { Modal, useDisclosure } from '@chakra-ui/react'

export default function EventCalendarWeekComponent({ workingSlot, authUser }) {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const HoursCalDisp = {
    startHours: new Date(workingSlot.startDateTime).getHours(),
    startMinutes: String(
      new Date(workingSlot.startDateTime).getMinutes()
    ).padStart(2, "0"),
    endHours: new Date(workingSlot.endDateTime).getHours(),
    endMinutes: String(new Date(workingSlot.endDateTime).getMinutes()).padStart(
      2,
      "0"
    ),
  };

  const [openEvent, setOpenEvent] = useState(false);
  const [eventInfo, setEventInfo] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState(null);
  const [select, setSelect] = useState(null);
  const [time, setTime] = useState(null);

  const params = useParams();

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

    eventInfo.data.eventInfo.forEach((el) => {
      if (el.id === option) {
        setCategoryTitle(el.serviceItem.title);
      }
    });

    setSelect(option);
  };

  const onChangeTime = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

    setTime(option);
  };

  const clientCreateEvent = async (id) => {
    // const userId = JSON.parse(localStorage.getItem('id'))
    // const eventInfo = { masterId: params.id, clientId: userId, serviceItemId: select.id}
    // $api.post('/client/event/schedule', eventInfo)
  };

  const getEventInfo = async () => {
    const event = await $api.get(
      `http://localhost:3500/masters/${params.id}/events`
    );

    setEventInfo(event);
  };

  useEffect(() => {
    getEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputOpen, setInputOpen] = useState(false);

  function handleInputOpen() {
    setInputOpen(!inputOpen)
  }

  return (
    <>
      <li
        className={`relative mt-px flex col-start-${workingSlot.weekDay}`}
        style={{ gridRow: `${workingSlot.gridRow} / span ${workingSlot.span}` }}
        onClick={authUser.role === "master" ? null : () => setOpenEvent(true)}
      >
        <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-50 p-2 text-xs leading-5 hover:bg-gray-100">
          <p className="order-1 font-semibold text-gray-700">Рабочий слот</p>
          {!inputOpen ? (
            <Stack spacing={9} direction="row" align="center">
              <p className="text-gray-500 group-hover:text-gray-700">
                <time dateTime={workingSlot.startDateTime}>
                  {HoursCalDisp.startHours}:{HoursCalDisp.startMinutes}-
                  {HoursCalDisp.endHours}:{HoursCalDisp.endMinutes}
                </time>
              </p>
              {authUser.role === "master" ? (
                <ButtonsEditDeleteWorkingSlot workingSlot={workingSlot} handleInputOpen={handleInputOpen}/>
              ) : (
                ""
              )}
            </Stack>
          ) : (
            <InputWorkingSlotEdit handleInputOpen={handleInputOpen} HoursCalDisp={HoursCalDisp}/>
          )}
        </div>
      </li>
    </>
  );
}
