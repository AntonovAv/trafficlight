const I2C = require('bindings')({
  bindings: 'i2c_addon.node',
  module_root: __dirname
})

/*
 this wrappers wraps the i2c readBytes, writeBytes functions and returns promises
 */
function makeI2CWrapper(address, {device, debug}) {
  const i2c = I2C.open(device, address)

  const readBytes = (cmd, length) => {
    return new Promise(
      function(resolve, reject) {
        // TODO didn't work
        return resolve(0x10)
        i2c.readBytes(cmd, length, function(error, data) {
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
        i2c.writeBlockData(cmd, buf, function(error, data) {
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
