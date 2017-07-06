import axios from 'axios'

export default function apiMiddleware() {
  const apiClient = axios
  apiClient.defaults.timeout = 60000
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }

      const {promise, types, successCb, errorCb, ...rest} = action
      if (!promise) {
        return next(action)
      }

      const [REQUEST, SUCCESS, FAILURE] = types
      next({...rest, type: REQUEST})

      const actionPromise = promise(apiClient, getState)
      actionPromise.then(
        (response) => {
          next({...rest, data: response.data, type: SUCCESS})

          if (successCb !== undefined) {
            successCb(response.data, dispatch, getState)
          }
        },
        (error) => {
          next({...rest, error: error.data, type: FAILURE})

          if (errorCb !== undefined) {
            dispatch(errorCb)
          }
        }
      ).catch((error) => {
        next({...rest, error, type: FAILURE})
      })

      return actionPromise
    }
  }
}
