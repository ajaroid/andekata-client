import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import localstorage from './localstorageEnhancer'

const middlewares = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  compose(applyMiddleware(...middlewares), localstorage)
)

export default configureStore
