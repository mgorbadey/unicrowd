import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import masterReducer from './masterReducer'
import resultReducer from './resultsReducer'
import eventReducer from './eventReducer'
import localeStorageReducer from './localeStorageReducer'
import pictureReducer from './pictureReducer'
import navigatorReducer from './navigatorReducer'
import loaderReducer from './loaderReducer'

const rootReducer = combineReducers({
  search: searchReducer,
  results: resultReducer,
  master: masterReducer,
  event: eventReducer,
  localStorage: localeStorageReducer,
  picture: pictureReducer,
  navigator: navigatorReducer,
  loader: loaderReducer,
})

export default rootReducer
