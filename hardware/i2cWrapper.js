const I2C = require('bindings')({
  bindings: 'i2c_addon.node',
  module_root: __dirname
})

/*
 this wrappers wraps the i2c readBytes, writeBytes functions and returns promises
 */
function makeI2CWrapper(address, {device, debug}) {
  I2C.open(device, address)

  const readBytes = (cmd, length) => {
    return new Promise(
      function(resolve, reject) {
        I2C.readBlockData(cmd, length, null, function(error, data) {
          if (error) {
            return reject(error)
          }
          resolve(data)
        })
      }
    )
  }

  const writeBytes = (cmd, buf) => {
    if (!(buf instanceof Array)) {
      buf = [buf]
    }
    if (!Buffer.isBuffer(buf)) {
      buf = new Buffer(buf)
    }
    if (debug) {
      console.log(`cmd ${cmd.toString(16)} values ${buf}`)
    }
    return new Promise(
      function(resolve, reject) {
        I2C.writeBlockData(cmd, buf, function(error, data) {
          if (error) {
            return reject(error)
          }

          resolve(data)
        })
      }
    )
  }

  return {
    readBytes,
    writeBytes
  }
}

module.exports = makeI2CWrapper
