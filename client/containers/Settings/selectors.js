import {createSelector} from 'reselect'

export function selectSettings(state) {
  return state.settings
}

export const selectBrightness = createSelector(
  [selectSettings],
  (settings) => settings.brightness
)

export const selectIsSettingsChanged = createSelector(
  [selectSettings],
  (settings) => settings.changed
)

export const selectSoundVolume = createSelector(
  [selectSettings],
  (settings) => settings.volume
)
