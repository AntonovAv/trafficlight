import {
  CHANGE_NAME, CHANGE_URL, OPEN_DIALOG, CLOSE_DIALOG,
  SAVE_DATA, SAVE_DATA_SUCCESS, SAVE_DATA_FAILURE,
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
  teamcityStatus: {
    checking: false,
    status: null,
  },
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
        teamcityStatus: {
          ...state.teamcityStatus,
          status: null,
        }
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
    case CLOSE_DIALOG:
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
      return {
        ...state,
        teamcityStatus: {
          ...state.teamcityStatus,
          checking: true,
          status: null,
        },
      }
    case TEST_TEAMCITY_SUCCESS:
      return {
        ...state,
        teamcityStatus: {
          ...state.teamcityStatus,
          checking: false,
          status: data
        }
      }
    case TEST_TEAMCITY_FAILURE:
      return {
        ...state,
        teamcityStatus: {
          ...state.teamcityStatus,
          checking: false,
        }
      }

    case SAVE_DATA:
      return {
        ...state,
        saving: true,
      }
    case SAVE_DATA_SUCCESS:
      return {
        ...state,
        saving: false,
      }
    case SAVE_DATA_FAILURE: {
      return {
        ...state,
        saving: false,
      }
    }
    default:
      return state
  }
}
