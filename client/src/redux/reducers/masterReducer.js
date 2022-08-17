import initState from '../initState'
import masterType from '../types/masterType'

//выносим логику, которая работает со стейтом из компонентов - сюда >>>>>>>>

const masterReducer = (state = initState.master, action) => {
  switch (action.type) {
    case masterType.WORKINGSLOTS:
      return action.payload
    case masterType.ADDWORKINGSLOTS:
      console.log(action.payload);
      return [...state, ...action.payload]
    case masterType.DELETEWORKINGSLOTS:
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

export default masterReducer
