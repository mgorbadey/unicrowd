import resultsType from '../types/resultsType'
import $api from '../../http'

export const getData = (data) => ({
  type: resultsType.GET_DATA,
  payload: data,
})

export const getDataThunk = () => async (dispatch) => {
  try {
    const response = await $api.get('/results')
    console.log('response: ', response)
  } catch (error) {
    console.log(error.message)
  }
}
