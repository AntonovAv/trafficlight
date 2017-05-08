const Light = require('../models/Light')
const N_LIGHT_TICKS_IN_SEC = require('../constants').N_LIGHT_TICKS_IN_SEC

exports.default = function * () {
  let ticks = 0
  while (true) {
    if (ticks < N_LIGHT_TICKS_IN_SEC / 3) {
      yield new Light(true, false, false)
    } else if (ticks < N_LIGHT_TICKS_IN_SEC * 2 / 3) {
      yield new Light(false, true, false)
    } else if (ticks < N_LIGHT_TICKS_IN_SEC) {
      yield new Light(false, false, true)
    } else {
      ticks = 0
    }
    ticks++
  }
}

exports.allSuccess = function * () {
  while (true) {
    yield new Light(false, false, true)
  }
}

exports.failure = function * () {
  while (true) {
    yield new Light(true, false, false)
  }
}

exports.failureAndRunning = function * () {
  while (true) {
    yield new Light(true, true, false)
  }
}

exports.teamcityError = function * () {
  let ticks = 0
  while (true) {
    if (ticks < N_LIGHT_TICKS_IN_SEC) {
      yield new Light(false, false, false)
    } else if (ticks < N_LIGHT_TICKS_IN_SEC * 2) {
      yield new Light(false, true, false)
    } else {
      ticks = 0
    }
    ticks++
  }
}

exports.teamcityUnavailable = function * () {
  let ticks = 0
  while (true) {
    if (ticks < N_LIGHT_TICKS_IN_SEC) {
      yield new Light(false, false, false)
    } else if (ticks < N_LIGHT_TICKS_IN_SEC * 2) {
      yield new Light(true, false, false)
    } else {
      ticks = 0
    }
    ticks++
  }
}
