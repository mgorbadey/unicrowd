import initState from '../initState'
import resultType from '../types/resultsType'

const resultReducer = (state = initState.results, action) => {
  switch (action.type) {
    case resultType.GET_DATA:
      return action.payload

    default:
      return state
  }
}

export default resultReducer
