import initState from '../initState'

//выносим логику, которая работает со стейтом из компонентов - сюда >>>>>>>>

const masterReducer = (state = initState.master, action) => {
  switch (action.type) {
    case 'WORKINGSLOTS':
      // console.log('redux', action.payload)
      return action.payload
    default:
      return state //сохраняет состояние в память к-ра
  }
}

export default masterReducer
