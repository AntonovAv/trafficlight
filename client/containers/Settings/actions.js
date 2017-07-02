import {
  BRIGHTNESS_CHANGE
} from './constants'

export function onBrightnessChangeAction(newBr) {
  return {
    type: BRIGHTNESS_CHANGE,
    data: newBr,
  }
}
