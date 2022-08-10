import searchType from '../types/searchType'
import initState from '../initState'

const searchReducer = (state = initState.search, action) => {
  switch (action.type) {
    case searchType.GET_SEARCH_DATA:
      return [...action.payload.masters, ...action.payload.categories]

    case searchType.FINDED_DATA:
      return state.filter(
        (item) =>
          item?.username?.toLowerCase().includes(action.payload.string) ||
          item?.title?.toLowerCase().includes(action.payload.string)
      )

    default:
      return state
  }
}

export default searchReducer
