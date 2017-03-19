import {SUCCESS_BUILDS} from './constants'

export const LOAD_BUILDS = 'home/LOAD_BUILDS'
export const LOAD_BUILDS_SUCCESS = 'home/LOAD_BUILDS_SUCCESS'
export const LOAD_BUILDS_FAILURE = 'home/LOAD_BUILDS_FAILURE'

export const SET_LIGHT = 'home/SET_LIGHT'
export const SET_LIGHT_SUCCESS = 'home/SET_LIGHT_SUCCESS'
export const SET_LIGHT_FAILURE = 'home/SET_LIGHT_FAILURE'

const initState = {
  buildServer: 'Fake Server Name',
  buildsList: [],
  isLoading: false,
  nUpdates: 0,
  light: {
    red: false,
    yellow: false,
    green: false
  },
  status: {
    current: SUCCESS_BUILDS,
    failedBuilds: [],
    runningBuilds: []
  }
}

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD_BUILDS:
      return Object.assign({}, state, {
        isLoading: true
      })
    case LOAD_BUILDS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        buildsList: action.data,
        nUpdates: state.nUpdates + 1
      })
    case LOAD_BUILDS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false
      })
    default:
      return state
  }
}

export function loadBuilds() {
  return {
    types: [LOAD_BUILDS, LOAD_BUILDS_SUCCESS, LOAD_BUILDS_FAILURE],
    promise: (client) => {
      return client.get('api/buildTypes')
    }
  }
}

// TODO set only concrete light (now sll)
export function setLight(light) {
  return {
    types: [SET_LIGHT, SET_LIGHT_SUCCESS, SET_LIGHT_FAILURE],
    promise: (client) => {
      return client.put('api/light', {
        data: light
      })
    }
  }
}
