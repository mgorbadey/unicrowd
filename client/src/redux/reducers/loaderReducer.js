import loaderType from '../types/loaderType'
import initState from '../initState'

const loaderReducer = (state = initState.loader, action) => {
  switch (action.type) {
    case loaderType.SET_HEADER_TRUE:
      return { ...state, header: true }

    case loaderType.SET_HEADER_FALSE:
      return { ...state, header: false }

    case loaderType.SET_BODY_TRUE:
      return { ...state, body: true }

    case loaderType.SET_BODY_FALSE:
      return { ...state, body: false }

    default:
      return state
  }
}

export default loaderReducer
