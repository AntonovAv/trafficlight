import {createSelector} from 'reselect'

export function selectSettings(state) {
  return state.settings
}

export const selectBrightness = createSelector(
  [selectSettings],
  (settings) => settings.brightness
)
