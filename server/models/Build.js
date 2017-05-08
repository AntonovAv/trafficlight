class Build {
  constructor(buildTypeId, isRunning, isFailure) {
    this._buildTypeId = buildTypeId
    this._isRunning = isRunning
    this._isFailure = isFailure
  }

  get buildTypeId() {
    return this._buildTypeId
  }

  get isRunning() {
    return this._isRunning
  }

  get isFailure() {
    return this._isFailure
  }
}

module.exports = Build
