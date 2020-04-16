const express = require('express')
const teams = require('./teams')

const app = express()

app.get('/teams', (request, response) => {
  return response.send(teams)
})

app.get('/teams/:ID', (request, response) => {
  const ID = response.params
  const getTeamID = teams.find((getTeamID) => getTeamID.ID === ID)

  return response.send(getTeamID)
})

app.all('*', (request, respone) => {
  return respone.status(404).send('Team not found')
})

app.listen(1111, () => {
  console.log('Listening on port 1111...') // eslint-disable-line no-console
})
