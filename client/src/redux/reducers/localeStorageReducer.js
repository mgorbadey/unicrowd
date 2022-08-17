import initState from '../initState'
import localeStorageType from '../types/localeStorageType'

const localeStorageReducer = (state = initState.localStorage, action) => {
  switch (action.type) {
    case localeStorageType.CHANGE_STATUS_LC:
      return !state

    default:
      return state
  }
}

export default localeStorageReducer
