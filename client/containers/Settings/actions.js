import {
  BRIGHTNESS_CHANGE,
  SOUND_CHANGE,
} from './constants'

export function onBrightnessChangeAction(newBr) {
  return {
    type: BRIGHTNESS_CHANGE,
    data: newBr,
  }
}

export function onSoundChangeAction(newVal) {
  return {
    type: SOUND_CHANGE,
    data: newVal,
  }
}
