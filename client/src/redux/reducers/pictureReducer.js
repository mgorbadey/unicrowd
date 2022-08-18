import initState from '../initState'
import pictureType from '../types/pictureType'

const pictureReducer = (state = initState.picture, action) => {
  switch (action.type) {
    case pictureType.GET_PICTURE:
      return !state
    default:
      return state
  }
}

export default pictureReducer
