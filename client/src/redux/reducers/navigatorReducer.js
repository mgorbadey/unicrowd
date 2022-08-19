import navigatorType from '../types/navigatorType'
import initState from '../initState'

const navigatorReducer = (state = initState.navigator, action) => {
  switch (action.type) {
    case navigatorType.UPDATE:
      return !state

    default:
      return state
  }
}

export default navigatorReducer
