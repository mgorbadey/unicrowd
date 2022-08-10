import masterType from "../types/searchType"


export const getWorkingSlots = (arr) => ({
  type: masterType.WORKINGSLOTS, payload: arr
})
