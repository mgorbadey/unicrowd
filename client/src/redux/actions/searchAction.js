import searchType from '../types/searchType'

export const saveSearch = (string) => ({
  type: searchType.SAVE_SEARCH_STRING,
  payload: string,
})

// export const sendSearchThunk = (string) => async (dispatch) => {
//   try {
//     const response = await $api.post('/search', {string})
//   } catch (error) {
//     console.log(error.message)
//   }
// }
