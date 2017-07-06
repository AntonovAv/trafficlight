import {
  CHANGE_NAME, CHANGE_URL, OPEN_DIALOG, CANCEL_EDIT,
  SAVE_DATA_SUCCESS,
  LOAD_TEAMCITY_DATA_SUCCESS,
  TEST_TEAMCITY, TEST_TEAMCITY_SUCCESS, TEST_TEAMCITY_FAILURE,
} from './constants'

const initState = {
  id: null,
  name: '',
  url: '',
  ignoredBuildTypeIds: [],
  soundRules: [],
  buildTypes: [],
  serverStatus: null,
  teamcityChecking: false,
  buildTypesLoading: false,
  saving: false,
  active: false,
}

export default function reducer(state = initState, {type, data}) {
  switch (type) {
    case CHANGE_URL:
      return {
        ...state,
        url: data,
      }
    case CHANGE_NAME:
      return {
        ...state,
        name: data,
      }
    case OPEN_DIALOG:
      return {
        ...state,
        active: true,
      }
    case CANCEL_EDIT:
    case SAVE_DATA_SUCCESS:
      return initState
    case LOAD_TEAMCITY_DATA_SUCCESS: {
      return {
        ...state,
        id: data.id,
        name: data.name,
        url: data.url,
        ignoredBuildTypeIds: data.ignoredBuildTypes,
      }
    }
    case TEST_TEAMCITY:
      return {...state, teamcityChecking: true}
    case TEST_TEAMCITY_SUCCESS:
      return {...state, serverStatus: true, teamcityChecking: false}
    case TEST_TEAMCITY_FAILURE:
      return {...state, teamcityChecking: false}
    default:
      return state
  }
}
