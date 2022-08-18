import masterType from "../types/masterType"


export const getWorkingSlots = (arr) => ({
  type: masterType.WORKINGSLOTS, payload: arr
})

export const addWorkingSlots = (arr) => ({
  type: masterType.ADDWORKINGSLOTS, payload: arr
})

export const deleteWorkingSlots = (arr) => ({
  type: masterType.DELETEWORKINGSLOTS, payload: arr
})

export const editWorkingSlots = (obj) => ({
  type: masterType.EDITWORKINGSLOTS, payload: obj
})
