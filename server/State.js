const PlayerState = require('./models/PlayerState')
const Light = require('./models/Light')

const EventEmitter = require('events').EventEmitter

const LIGHT_CHANGED_EVENT = 'light_changed'
const PLAYER_CHANGED_EVENT = 'player_changed'
const BUILDS_CHANGED_EVENT = 'builds_changed'

let instance = null

class State extends EventEmitter {

  constructor(lightState, playerState, buildsState) {
    super()

    this._lightState = lightState
    this._soundState = playerState
    this._buildsState = buildsState
  }

  static init(lightState, playerState, buildsState) {
    instance = new State(
      new Light(false, false, false),
      new PlayerState(false, false, null),
      buildsState
    )
  }

  static get() {
    return instance
  }

  set lightState(value) {
    this._lightState = value
    this.emit(LIGHT_CHANGED_EVENT, value)
  }

  set playerState(value) {
    this._soundState = value
    this.emit(PLAYER_CHANGED_EVENT, value)
  }

  set buildsState(value) {
    this._buildsState = value
    this.emit(BUILDS_CHANGED_EVENT, value)
  }

  get lightState() {
    return this._lightState
  }

  get playerState() {
    return this._soundState
  }

  get buildsState() {
    return this._buildsState
  }
}

module.exports = State
State.LIGHT_CHANGED_EVENT = LIGHT_CHANGED_EVENT
State.PLAYER_CHANGED_EVENT = PLAYER_CHANGED_EVENT
State.BUILDS_CHANGED_EVENT = BUILDS_CHANGED_EVENT
