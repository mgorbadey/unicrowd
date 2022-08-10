import $api from '../../http'
import searchType from '../types/searchType'

export const getSearchData = (data) => ({
  type: searchType.GET_SEARCH_DATA,
  payload: data,
})

export const getSearchDataThunk = () => async (dispatch) => {
  try {
    const response = await $api.get('/search')
    dispatch(getSearchData(response.data))
  } catch (error) {
    console.log(error.message)
  }
}
