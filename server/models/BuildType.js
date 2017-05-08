class BuildType {
  constructor(id, projectId) {
    this._id = id
    this._projectId = projectId
  }

  get id() {
    return this._id
  }

  get projectId() {
    return this._projectId
  }
}

module.exports = BuildType
