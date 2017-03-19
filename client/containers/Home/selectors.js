import {createSelector} from 'reselect'

export const selectHome = (store) => store.home

export const isBuildsLoading = createSelector(
  [selectHome],
  (home) => home.isLoading
)

export const getBuildServer = createSelector(
  [selectHome],
  (home) => home.buildServer
)

export const getBuildsList = createSelector(
  [selectHome],
  (home) => home.buildsList
)

export const getNUpdates = createSelector(
  [selectHome],
  (home) => home.nUpdates
)

export const getLight = createSelector(
  [selectHome],
  (home) => home.light
)
