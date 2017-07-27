const i2cBinding = require('bindings')({
  bindings: 'i2c_addon.node',
  module_root: __dirname
})

/*
 this wrappers wraps the i2c readBytes, writeBytes functions and returns promises
 */
class I2C {
  constructor(device, address) {
    this._device = device
    this._address = address
  }

  open() {
    i2cBinding.open(this._device, this._address)
  }

  close() {
    i2cBinding.close()
  }

  readBytes(cmd, length) {
    return new Promise(
      function(resolve, reject) {
        i2cBinding.readBlockData(cmd, length, null, function(error, data) {
          if (error) {
            return reject(error)
          }
          resolve(data)
        })
      }
    )
  }

  writeBytes(cmd, buf) {
    if (!(buf instanceof Array)) {
      buf = [buf]
    }
    if (!Buffer.isBuffer(buf)) {
      buf = new Buffer(buf)
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
}

module.exports = I2C
