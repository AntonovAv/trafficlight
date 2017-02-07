import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import createApiMiddleware from './apiMiddleware'

export function configure() {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const logger = createLogger()
  const apiMiddleware = createApiMiddleware()

  const createStoreWithMiddleware = applyMiddleware(
    apiMiddleware,
    thunk,
    logger
  )(create)

  const store = createStoreWithMiddleware(reducers)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configure
