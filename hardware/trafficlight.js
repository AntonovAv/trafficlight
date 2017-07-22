const pwmDriver = require('./pwmDriver')({
  device: '/dev/i2c-0',
  address: 0x40,
})
const sleep = require('./sleep').sleep

// Configure min and max servo pulse lengths
const servoMin = 150 // Min pulse length out of 4096
const servoMax = 600 // Max pulse length out of 4096

pwmDriver.setPWMFreq(50)

const loop = function() {
  return sleep(1)
    .then(function() {
      return pwmDriver.setPWM(0, 0, servoMin)
    })
    .then(function() {
      return sleep(1)
    })
    .then(function() {
      return pwmDriver.setPWM(0, 0, servoMax)
    })
    .then(loop)
}

sleep(5)
  .then(loop)