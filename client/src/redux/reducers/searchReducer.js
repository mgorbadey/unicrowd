import searchType from '../types/searchType'
import initState from '../initState'

const searchReducer = (state = initState.search, action) => {
  switch (action.type) {
    case searchType.GET_SEARCH_DATA:

    default:
      return state
  }
}

export default searchReducer
