import eventType from "../types/eventType"


export const getClientSlots = (arr) => ({
  type: eventType.CLIENTSLOTS, payload: arr
});
