import initState from '../initState'
import eventType from '../types/eventType'

//выносим логику, которая работает со стейтом из компонентов - сюда >>>>>>>>

const eventReducer = (state = initState.event, action) => {
  switch (action.type) {
    case eventType.CLIENTSLOTS:
      return action.payload
    case eventType.CLIENTSLOTS_APPROVE:
      const newState = state.map((el) => el.id === action.payload ? {...el, status: 'approved'} : el)
      return newState
    case eventType.CLIENTSLOTS_DELETE:
      let result =[];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.payload) {
          result.push(state[i])
        }
      }
      return result
    default:
      return state //сохраняет состояние в память к-ра
  }
}

export default eventReducer
