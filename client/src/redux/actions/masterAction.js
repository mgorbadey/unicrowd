import masterType from "../types/masterType"

export const getDisplayedWeek = (arr) => ({
  type: masterType.DISPLAYEDWEEK, payload: arr
});

export const getWorkingSlots = (arr) => ({
  type: masterType.WORKINGSLOTS, payload: arr
})

