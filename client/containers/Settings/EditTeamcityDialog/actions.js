import {
  CHANGE_NAME, CHANGE_URL, OPEN_DIALOG, CLOSE_DIALOG,
  SAVE_DATA, SAVE_DATA_SUCCESS, SAVE_DATA_FAILURE,
  LOAD_TEAMCITY_DATA, LOAD_TEAMCITY_DATA_SUCCESS, LOAD_TEAMCITY_DATA_FAILURE,
  TEST_TEAMCITY, TEST_TEAMCITY_SUCCESS, TEST_TEAMCITY_FAILURE,
  LOAD_BUILD_TYPES, LOAD_BUILD_TYPES_SUCCESS, LOAD_BUILD_TYPES_FAILURE,
} from './constants'
import {selectDialogData} from './selectors'
import {addTeamcityServerAction} from '../actions'
import {addhttp} from '../utils'

export function openDialogAction(id) {
  return dispatch => {
    if (id !== null) {
      dispatch(loadDialogDataAction(id))
    }
    dispatch({
      type: OPEN_DIALOG,
      data: id || null,
    })
  }
}

export function closeDialogAction() {
  return {
    type: CLOSE_DIALOG
  }
}

export function loadDialogDataAction(id) {
  return dispatch => {
    dispatch({
      types: [LOAD_TEAMCITY_DATA, LOAD_TEAMCITY_DATA_SUCCESS, LOAD_TEAMCITY_DATA_FAILURE],
      promise: (client) => {
        return client.get(`/api/settings/teamcity/${id}`)
      }
    })
  }
}

export function saveDialogDataAction() {
  return (dispatch, getState) => {
    const dialogData = selectDialogData(getState())

    dispatch({
      types: [SAVE_DATA, SAVE_DATA_SUCCESS, SAVE_DATA_FAILURE],
      promise: (client) => {
        return client.post(
          '/api/settings/teamcity',
          {
            id: dialogData.id,
            name: dialogData.name,
            url: dialogData.url,
            ignoredBuildTypes: dialogData.ignoredBuildTypeIds
          }
        )
      },
      successCb: (data, dispatch) => {
        dispatch(addTeamcityServerAction(data))
        dispatch(closeDialogAction())
      }
    })
  }
}

export function testTeamcityAction() {
  return (dispatch, getState) => {
    const url = selectDialogData(getState()).url
    dispatch({
      types: [TEST_TEAMCITY, null, TEST_TEAMCITY_FAILURE],
      promise: (client) => {
        return client.get(`api/settings/teamcity/test/${encodeURIComponent(url)}`)
      },
      successCb: (data, dispatch) => {
        dispatch({
          type: TEST_TEAMCITY_SUCCESS,
          data: !!data.data && !!data.data.version,
        })
      }
    })
  }
}

export function loadBuildTypesAction() {
  return (dispatch, getState) => {
    const url = selectDialogData(getState()).url
    dispatch({
      types: [LOAD_BUILD_TYPES, LOAD_BUILD_TYPES_SUCCESS, LOAD_BUILD_TYPES_FAILURE],
      promise: (c) => {
        return c.get(`/api/settings/teamcity/build-types/${encodeURIComponent(url)}`)
      }
    })
  }
}

export function urlChangeAction(newUrl) {
  return {
    type: CHANGE_URL,
    data: addhttp(newUrl),
  }
}

export function nameChangeAction(name) {
  return {
    type: CHANGE_NAME,
    data: name,
  }
}
