class BuildType {
  constructor(id, name, projectId) {
    this._id = id
    this._name = name
    this._projectId = projectId
  }

  get id() {
    return this._id
  }

  get projectId() {
    return this._projectId
  }

  get name() {
    return this._name;
  }

  static createFromTCModel(model) {
    return new BuildType(model.id, model.name, model.projectId)
  }

  static createFromDBModel(model) {
    return new BuildType(model.id, model.name, model.projectId)
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      projectId: this.projectId
    }
  }
}

module.exports = BuildType
