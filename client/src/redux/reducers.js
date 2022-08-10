const initialState = [];

//выносим логику, которая работает со стейтом из компонентов - сюда >>>>>>>>

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "WORKINGSLOTS":
      // console.log('redux', action.payload)
      return action.payload;
    default:
      return state; //сохраняет состояние в память к-ра
  }
};
