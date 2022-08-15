import eventType from "../types/eventType"


export const getClientSlots = (arr) => ({
  type: eventType.CLIENTSLOTS, payload: arr
});

export const approveClientSlot = (id) => ({
  type: eventType.CLIENTSLOTS_APPROVE, payload: id
});

export const deleteClientSlot = (id) => ({
  type: eventType.CLIENTSLOTS_DELETE, payload: id
});
