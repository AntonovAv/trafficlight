import {
  STATE_UPDATE_SUCCESS,
  STATE_UPDATE_FAILURE,
} from './constants'
import APP_STATE_EVENTS from 'common/StateEvents'
import {playerStateChangeAction} from '../Audio/actions'

export function startListenState() {
  const eventSource = new EventSource('/api/state')
  return dispatch => {
    eventSource.addEventListener(APP_STATE_EVENTS.LIGHT_CHANGE, function(e) {
      dispatch({
        type: STATE_UPDATE_SUCCESS,
        data: JSON.parse(e.data)
      })
    })
    eventSource.addEventListener(APP_STATE_EVENTS.PLAYER_CHANGE, function(e) {
      dispatch(playerStateChangeAction(JSON.parse(e.data)))
    })
    eventSource.onerror = function(e) {
      dispatch({
        type: STATE_UPDATE_FAILURE,
        data: e
      })
    }
  }
}
