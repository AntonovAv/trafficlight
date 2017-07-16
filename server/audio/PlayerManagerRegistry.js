class PlayerManagerRegistry {
  constructor() {
    this._registry = []
  }

  register(pm) {
    this._registry.push(pm)
  }

  getRegistry() {
    return this._registry
  }
}

const instance = new PlayerManagerRegistry()

module.exports = instance
