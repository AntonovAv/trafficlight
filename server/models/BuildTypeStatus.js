class BuildTypeStatus {
  constructor(id, status) {
    this._id = id
    this._status = status
  }

  get status() {
    return this._status
  }

  get id() {
    return this._id
  }
}

module.exports = BuildTypeStatus
module.exports.STATUS_TYPE = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  FAILURE_AND_RUNNING: 'failure_and_running',
  RUNNING: 'running',
  NO_BUILDS: 'no_builds',
}
