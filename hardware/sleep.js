const NanoTimer = require('nanotimer')

module.exports.sleep = function(seconds) {
  return new Promise(
    function(resolve, reject) {
      const timer = new NanoTimer()
      timer.setTimeout(x => resolve(seconds), '', `${seconds}s`)
      timer.clearInterval()
    })
}

module.exports.usleep = function(micros) {
  return new Promise(
    function(resolve, reject) {
      const timer = new NanoTimer()
      timer.setTimeout(x => resolve(micros), '', `${micros}u`)
      timer.clearInterval()
    })
}
