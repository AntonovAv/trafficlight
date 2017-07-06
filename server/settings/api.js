const route = require('express').Router()
const resource = require('./resource')
const pmRegistry = require('../audio/PlayerManagerRegistry')
const R = require('ramda')

route.get('/params', async function(request, response) {
  try {
    let settings = await resource.getSettings()
    settings = settings.toObject()

    response.send(settings).end()
  } catch (e) {
    response.status(500).send(e).end()
  }
})

route.post('/params', async function(req, resp) {
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

route.post('/teamcity', async (req, resp) => {
  try {
    const {name, url} = req.body
    const isExists = await resource.isTeamcityServerExists(name, url)
    if (isExists) {
      resp.status(400).end()
    } else {
      const saved = await resource.saveTeamcityServer(req.body)
      resp.status(200).send(teamcityForClient(saved)).end()
    }
  } catch (e) {
    resp.status(500).send(e).end()
  }
})

route.get('/teamcity', async (req, resp) => {
  try {
    const res = await resource.getAllTeamcityServers()
    const forClient = R.map((model) => teamcityForClient(model), res)
    resp.status(200).send(forClient).end()
  } catch (e) {
    resp.status(500).send(e).end()
  }
})

route.get('/teamcity/:id', async (req, resp) => {
  try {
    const res = await resource.getTeamcityServer(req.params.id)
    if (res) {
      resp.status(200).send(teamcityForClient(res)).end()
    } else {
      resp.status(404).end()
    }
  } catch (e) {
    resp.status(500).send(e).end()
  }
})

route.delete('/teamcity/:id', async (req, resp) => {
  try {
    await resource.deleteTeamcityServer(req.params.id)
    resp.end()
  } catch (e) {
    resp.status(500).send(e).end()
  }
})

const teamcityForClient = (model) => {
  return {
    id: model.id.toString(),
    name: model.name,
    url: model.url,
    ignoredBuildTypes: model.ignoredBuildTypes
  }
}

module.exports = route
