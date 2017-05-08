class BuildsState {
  constructor(buildTypeStatues) {
    this._buildTypeStatues = buildTypeStatues
  }

  get buildTypeStatues() {
    return this._buildTypeStatues
  }

  set buildTypeStatues(value) {
    this._buildTypeStatues = value
  }

  toJSON() {
    return this.buildTypeStatues.map((buildTypeStatus) => {
      return {
        id: buildTypeStatus.id,
        status: buildTypeStatus.status
      }
    })
  }
}

module.exports = BuildsState
