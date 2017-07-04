import {createSelector} from 'reselect'

export function selectSettings(state) {
  return state.settings
}

export const selectIsSettingsChanged = createSelector(
  [selectSettings],
  (settings) => settings.changed
)

export const selectParemeters = createSelector(
  [selectSettings],
  (settings) => settings.parameters
)