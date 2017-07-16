const State = require('../State')

class TrafficlightManager {
  constructor() {
    this._brightness = {
      r: 0,
      y: 0,
      g: 0,
    }
  }

  init(brightness) {
    State.get().on(State.LIGHT_CHANGED_EVENT, (val) => {
      this._setLights(val)
    })
    this.setBrightness(brightness)
  }

  _setLights(val) {
    // TODO set 0 or value from brightness (1)
    console.log(`red ${val.red}`)
    console.log(`yellow ${val.yellow}`)
    console.log(`green ${val.green}`)
  }

  setBrightness({r, y, g}) {
    this._brightness = {
      r, y, g
    }
    console.log(r, y, g)
  }
}

const instance = new TrafficlightManager()
module.exports = instance
