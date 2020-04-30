const express = require('express')
const bodyParser = require('body-parser')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('./controllers/teams')

const app = express()

app.get('/', getAllVillains)

app.get('/:slug', getVillainBySlug)

app.post('/', bodyParser.json(), saveNewVillain)

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
