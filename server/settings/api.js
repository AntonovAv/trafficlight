const route = require('express').Router()
const resource = require('./resource')
const pmRegistry = require('../audio/PlayerManagerRegistry')

route.get('/', async function(request, response) {
  try {
    let settings = await resource.getSettings()
    settings = settings.toObject()

    response.send(settings).end()
  } catch (e) {
    response.status(500).send(e).end()
  }
})

route.post('/', async function(req, resp) {
  try {
    const saved = await resource.saveSettings(req.body)
    for (let pm of pmRegistry.getRegistry()) {
      await pm.changeVolume(saved.volume)
    }
    resp.end()
  } catch (e) {
    resp.status(500).send(e).end()
  }
})

module.exports = route
