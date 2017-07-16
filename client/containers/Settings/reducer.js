import {combineReducers} from 'redux'
import editDialog from './EditTeamcityDialog/reducer'
import {
  BRIGHTNESS_CHANGE,
  SOUND_CHANGE,
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_FAILURE,
  LOAD_SETTINGS_SUCCESS,
  ADD_TEAMCITY_SERVER,
  DELETE_TEAMCITY_SUCCESS,
} from './constants'
import R from 'ramda'

const initState = {
  parameters: {
    brightness: {
      r: 0,
      y: 0,
      g: 0,
    },
    volume: 0,
  },
  teamcityList: [],
  changed: false,
  saving: false,
}

function reducer(state = initState, {type, data}) {
  switch (type) {
    case BRIGHTNESS_CHANGE:
      return {
        ...state,
        parameters: {
          ...state.parameters,
          brightness: data
        },
        changed: true,
      }
    case SOUND_CHANGE: {
      return {
        ...state,
        parameters: {
          ...state.parameters,
          volume: data,
        },
        changed: true,
      }
    }
    case SAVE_SETTINGS: {
      return {
        ...state,
        saving: true,
      }
    }
    case SAVE_SETTINGS_SUCCESS: {
      return {
        ...state,
        saving: false,
        changed: false,
      }
    }
    case SAVE_SETTINGS_FAILURE: {
      return {
        ...state,
        saving: false,
      }
    }
    case LOAD_SETTINGS_SUCCESS: {
      return {
        ...state,
        changed: false,
        parameters: {
          brightness: data.parameters.brightness,
          volume: data.parameters.volume,
        },
        teamcityList: data.teamcityList,
      }
    }
    case ADD_TEAMCITY_SERVER: {
      let exists = false
      const teamcities = R.map((teamcity) => {
        if (teamcity.id === data.id) {
          exists = true
          return data
        } else {
          return teamcity
        }
      }, state.teamcityList)
      if (!exists) {
        teamcities.push(data)
      }

      return {
        ...state,
        teamcityList: teamcities
      }
    }
    case DELETE_TEAMCITY_SUCCESS: {
      return {
        ...state,
        teamcityList: R.filter(({id}) => id !== data, state.teamcityList)
      }
    }
    default:
      return state
  }
}

export default combineReducers({
  page: reducer,
  editDialog,
})
