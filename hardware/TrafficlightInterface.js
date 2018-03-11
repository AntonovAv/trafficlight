class TrafficlightInterface {
  async setBrightness({r, y, g}) {
    // abstract
  }

  async setPWMFreq(freq = 0) {
    // abstract
  }
}

module.exports = TrafficlightInterface
