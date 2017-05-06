import {STATE_UPDATE_SUCCESS, STATE_UPDATE_FAILURE} from './constants'

export function startListenState() {
  const eventSource = new EventSource('/api/state')
  return dispatch => {
    eventSource.addEventListener('lightChange', function(e) {
      dispatch({
        type: STATE_UPDATE_SUCCESS,
        data: JSON.parse(e.data)
      })
    })
    eventSource.onerror = function(e) {
      dispatch({
        type: STATE_UPDATE_FAILURE,
        data: e
      })
    }
  }
}
