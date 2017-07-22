const NanoTimer = require('nanotimer')

module.exports = function sleep(seconds) {
  return new Promise(
    function(resolve, reject) {
      const timer = new NanoTimer()
      timer.setTimeout(x => resolve(seconds), '', `${seconds}s`)
      timer.clearInterval()
    })
}

module.exports = function usleep(micros) {
  return new Promise(
    function(resolve, reject) {
      const timer = new NanoTimer()
      timer.setTimeout(x => resolve(micros), '', `${micros}u`)
      timer.clearInterval()
    })
}
