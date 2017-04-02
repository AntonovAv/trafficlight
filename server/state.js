const EventEmitter = require('events').EventEmitter

const LIGHT_CHANGED_EVENT = 'light_changed'
const SOUND_CHANGED_EVENT = 'sound_changed'
const BUILDS_CHANGED_EVENT = 'builds_changed'

let instance = null

class State extends EventEmitter {

  constructor(lightState, soundState, buildsState) {
    super()

    this._lightState = lightState
    this._soundState = soundState
    this._buildsState = buildsState
  }

  static init(lightState, soundState, buildsState) {
    instance = new State(lightState, soundState, buildsState)
  }

  static get() {
    return instance
  }

  set lightState(value) {
    this._lightState = value
    this.emit(LIGHT_CHANGED_EVENT, value)
  }

  set soundState(value) {
    this._soundState = value
    this.emit(SOUND_CHANGED_EVENT, value)
  }

  set buildsState(value) {
    this._buildsState = value
    this.emit(BUILDS_CHANGED_EVENT, value)
  }

  get lightState() {
    return this._lightState
  }

  get soundState() {
    return this._soundState
  }

  get buildsState() {
    return this._buildsState
  }
}

module.exports = State
State.LIGHT_CHANGED_EVENT = LIGHT_CHANGED_EVENT
State.SOUND_CHANGED_EVENT = SOUND_CHANGED_EVENT
State.BUILDS_CHANGED_EVENT = BUILDS_CHANGED_EVENT
