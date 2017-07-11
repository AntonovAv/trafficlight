import {
  CHANGE_NAME, CHANGE_URL, OPEN_DIALOG, CLOSE_DIALOG,
  SAVE_DATA, SAVE_DATA_SUCCESS, SAVE_DATA_FAILURE,
  LOAD_TEAMCITY_DATA_SUCCESS,
  TEST_TEAMCITY, TEST_TEAMCITY_SUCCESS, TEST_TEAMCITY_FAILURE,
  LOAD_BUILD_TYPES, LOAD_BUILD_TYPES_SUCCESS, LOAD_BUILD_TYPES_FAILURE, HIDE_BUILD_TYPES,
} from './constants'

const initState = {
  id: null,
  name: '',
  url: '',
  ignoredBuildTypeIds: [],
  soundRules: [],

  teamcityStatus: {
    checking: false,
    status: null,
  },

  buildTypes: null,
  buildTypesLoading: false,
  showBuildTypes: false,

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

    case LOAD_BUILD_TYPES: {
      return {
        ...state,
        buildTypesLoading: true,
        showBuildTypes: true,
      }
    }
    case LOAD_BUILD_TYPES_SUCCESS: {
      return {
        ...state,
        buildTypesLoading: false,
        buildTypes: data
      }
    }
    case LOAD_BUILD_TYPES_FAILURE: {
      return {
        ...state,
        buildTypesLoading: false,
        buildTypes: null,
      }
    }
    case HIDE_BUILD_TYPES: {
      return {
        ...state,
        showBuildTypes: false,
      }
    }
    default:
      return state
  }
}
