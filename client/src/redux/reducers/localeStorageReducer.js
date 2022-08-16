import initState from '../initState'
import localeStorageType from '../types/localeStorageType'

const localeStorageReducer = (state = initState.localStorage, action) => {
  switch (action.type) {
    case localeStorageType.SAVE_TO_STORAGE:
      return true

    case localeStorageType.DELETE_FROM_STORAGE:
      return false

    default:
      return state
  }
}

export default localeStorageReducer
