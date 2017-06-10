import {createSelector} from 'reselect'

export const selectAudio = (state) => state.audio

export const selectSounds = createSelector(
  [selectAudio],
  (audio) => audio.sounds
)

export const soundsLoading = createSelector(
  [selectAudio],
  (audio) => audio.soundsLoading
)

export const selectPlayingId = createSelector(
  [selectAudio],
  (audio) => audio.playingId
)
