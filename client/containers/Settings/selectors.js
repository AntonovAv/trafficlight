import {createSelector} from 'reselect'

export function selectSettings(state) {
  return state.settings
}

export const selectPage = createSelector(
  [selectSettings],
  (s) => s.page
)

export const selectIsSettingsChanged = createSelector(
  [selectPage],
  (p) => p.changed
)

export const selectParameters = createSelector(
  [selectPage],
  (p) => p.parameters
)
