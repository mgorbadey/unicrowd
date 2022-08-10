import masterType from "../types/masterType"


export const getWorkingSlots = (arr) => ({
  type: masterType.WORKINGSLOTS, payload: arr
})
