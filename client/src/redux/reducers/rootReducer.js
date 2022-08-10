import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import masterReducer from './masterReducer'

const rootReducer = combineReducers({
  search: searchReducer,
  master: masterReducer,
})

export default rootReducer
