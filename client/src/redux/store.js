import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootReducer from './reducers/rootReducer'
import thunkMiddleware from 'redux-thunk'
import initState from './initState'

const composeEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(rootReducer, initState, composeEnhancer)

export default store
