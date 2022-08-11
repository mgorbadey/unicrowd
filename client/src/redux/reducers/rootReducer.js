import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import masterReducer from './masterReducer'
import resultReducer from './resultsReducer'

const rootReducer = combineReducers({
  search: searchReducer,
  results: resultReducer,
  master: masterReducer,
})

export default rootReducer
