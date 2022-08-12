import searchType from '../types/searchType'

export const saveSearch = (string) => ({
  type: searchType.SAVE_SEARCH_STRING,
  payload: string,
})
