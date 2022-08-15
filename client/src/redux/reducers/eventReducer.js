import initState from '../initState'
import eventType from '../types/eventType'

//выносим логику, которая работает со стейтом из компонентов - сюда >>>>>>>>

const eventReducer = (state = initState.event, action) => {
  switch (action.type) {
    case eventType.CLIENTSLOTS:
      return action.payload
    default:
      return state //сохраняет состояние в память к-ра
  }
}

export default eventReducer
