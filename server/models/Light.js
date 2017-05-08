class Light {
  constructor(red, yellow, green) {
    this._red = red
    this._yellow = yellow
    this._green = green
  }

  get red() {
    return this._red
  }

  set red(value) {
    this._red = value
  }

  get yellow() {
    return this._yellow
  }

  set yellow(value) {
    this._yellow = value
  }

  get green() {
    return this._green
  }

  set green(value) {
    this._green = value
  }

  toJSON() {
    return {
      red: this._red,
      yellow: this._yellow,
      green: this._green,
    }
  }
}

module.exports = Light
