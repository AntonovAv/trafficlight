export const LOAD_BUILDS = 'app/LOAD_BUILDS'
export const LOAD_BUILDS_SUCCESS = 'app/LOAD_BUILDS_SUCCESS'
export const LOAD_BUILDS_FAILURE = 'app/LOAD_BUILDS_FAILURE'

const initState = {
  buildServer: 'Fake Server Name',
  buildsList: [],
  isLoading: false,
  nUpdates: 0
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
      return client.get('api/builds')
    }
  }
}