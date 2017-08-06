const I2C = require('./i2cWrapper')
const usleep = require('./sleep').usleep

// ============================================================================
// Adafruit PCA9685 16-Channel PWM Servo Driver
// ============================================================================
module.exports = makePwmDriver

function makePwmDriver(options) {
  // Registers/etc.
  const MODE1 = 0x00
  const MODE2 = 0x01
  // eslint-disable-next-line
  const SUBADR1 = 0x02
  // eslint-disable-next-line
  const SUBADR2 = 0x03
  // eslint-disable-next-line
  const SUBADR3 = 0x04
  const PRESCALE = 0xFE
  const LED0_ON_L = 0x06
  const LED0_ON_H = 0x07
  const LED0_OFF_L = 0x08
  const LED0_OFF_H = 0x09
  const ALL_LED_ON_L = 0xFA
  const ALL_LED_ON_H = 0xFB
  const ALL_LED_OFF_L = 0xFC
  const ALL_LED_OFF_H = 0xFD

  // Bits:
  // eslint-disable-next-line
  const RESTART = 0x80
  const SLEEP = 0x10
  const ALLCALL = 0x01
  // eslint-disable-next-line
  const INVRT = 0x10
  const OUTDRV = 0x04

  const defaults = {
    address: 0x40,
    device: '/dev/i2c-0',
    debug: false
  }
  const {address, device, debug} = Object.assign({}, defaults, options)
  const i2c = new I2C(device, address)
  i2c.open()

  let prescale

  const init = async () => {
    if (debug) {
      console.log(`device //{device}, adress:${address}, debug:${debug}`)
      console.log(`Reseting PCA9685, mode1: ${MODE1}`)
    }
    // i2c.writeByte(0x06) // SWRST
    // i2c.writeBytes(MODE1, 0x00)
    //
    // i2c.writeBytes(MODE1, 0x00)
    // in the future use await i2c.writeBytes(MODE1, ALLCALL)
    await setAllPWM(0, 0)
    await i2c.writeBytes(MODE2, OUTDRV)
    await i2c.writeBytes(MODE1, ALLCALL)
    await usleep(5000)
    let mode1 = await i2c.readBytes(MODE1, 1)
    mode1 = mode1 & ~SLEEP // wake up (reset sleep)
    await i2c.writeBytes(MODE1, mode1)
    await usleep(5000)
    if (debug) console.log('init done ')
  }

  const setPWMFreq = async (freq) => {
    // "Sets the PWM frequency"
    let prescaleval = 25000000.0 // 25MHz
    prescaleval /= 4096.0 // 12-bit
    prescaleval /= freq
    prescaleval -= 1.0

    if (debug) {
      console.log(`Setting PWM frequency to ${freq} Hz`)
      console.log(`Estimated pre-scale: ${prescaleval}`)
    }
    prescale = Math.floor(prescaleval + 0.5)
    if (debug) {
      console.log(`Final pre-scale: ${prescale}`)
    }

    let data = await i2c.readBytes(MODE1, 1)
    const oldmode = data[0]
    let newmode = (oldmode & 0x7F) | 0x10 // sleep
    if (debug) {
      console.log(`prescale ${Math.floor(prescale)}, newMode: newmode.toString(16)`)
    }
    await i2c.writeBytes(MODE1, newmode) // go to sleep
    await i2c.writeBytes(PRESCALE, Math.floor(prescale))
    await i2c.writeBytes(MODE1, oldmode)
    await usleep(5000)
    return i2c.writeBytes(MODE1, oldmode | 0x80)
  }

  // Sets a single PWM channel
  const setPWM = async (channel, on, off) => {
    if (debug) {
      console.log(`Setting PWM channel, channel: ${channel}, on : ${on} off ${off}`)
    }
    await i2c.writeBytes(LED0_ON_L + 4 * channel, on & 0xFF)
    await i2c.writeBytes(LED0_ON_H + 4 * channel, on >> 8)
    await i2c.writeBytes(LED0_OFF_L + 4 * channel, off & 0xFF)
    return i2c.writeBytes(LED0_OFF_H + 4 * channel, off >> 8)
  }

  const setAllPWM = async (on, off) => {
    await i2c.writeBytes(ALL_LED_ON_L, on & 0xFF)
    await i2c.writeBytes(ALL_LED_ON_H, on >> 8)
    await i2c.writeBytes(ALL_LED_OFF_L, off & 0xFF)
    return i2c.writeBytes(ALL_LED_OFF_H, off >> 8)
  }

  const stop = () => i2c.writeBytes(ALL_LED_OFF_H, 0x01)

  const cancel = () => i2c.close()
  // actual init
  init()

  return {
    setPWM,
    setAllPWM,
    setPWMFreq,
    stop,
    cancel,
  }
}
