import {
  CHANGE_NAME, CHANGE_URL, OPEN_DIALOG, CANCEL_EDIT,
  SAVE_DATA_SUCCESS,
  LOAD_TEAMCITY_DATA_SUCCESS,
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
      return {
        ...state,
        active: false
      }
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
    default:
      return state
  }
}
