import {createSelector} from 'reselect'

export const selectBuilds = (store) => store.builds

export const isBuildsLoading = createSelector(
  [selectBuilds],
  (builds) => builds.isLoading
)

export const getBuildServer = createSelector(
  [selectBuilds],
  (builds) => builds.buildServer
)

export const getBuildsList = createSelector(
  [selectBuilds],
  (builds) => builds.buildsList
)

export const getNUpdates = createSelector(
  [selectBuilds],
  (builds) => builds.nUpdates
)
