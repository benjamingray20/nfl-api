/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllTeams, getTeamById, saveNewTeam } = require('../../controllers/teams')
const { teamsList, singleTeam, createTeam, missingTeamInfo } = require('../mocks/teams')


chai.use(sinonChai)
const { expect } = chai

describe('Controllers - teams', () => {
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.Teams, 'findOne')
    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllTeams', () => {
    it('retrieves a list of teams from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.Teams, 'findAll').returns(teamsList)

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })
  })

  describe('getTeamById', () => {
    // eslint-disable-next-line max-len
    it('retrieves the team associated with the provided ID from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleTeam)
      const request = { params: { id: '12' } }

      await getTeamById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '12' } })
      expect(stubbedSend).to.have.been.calledWith(singleTeam)
    })
    it('returns a 404 when no hero is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { id: 'not-found' } }

      await getTeamById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { id: 'throw-error' } }

      await getTeamById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('Unable to retrieve team, please try again')
    })
  })

  describe('saveNewTeam', () => {
    // eslint-disable-next-line max-len
    it('accepts new team details and saves them as a new team, returning the saved record with a 201 status', async () => {
      const request = { body: createTeam }
      const stubbedCreate = sinon.stub(models.Teams, 'create').returns(createTeam)

      await saveNewTeam(request, response)

      expect(stubbedCreate).to.have.been.calledWith(createTeam)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(createTeam)
    })
    it('returns a 400 when team info is missing', async () => {
      const request = { body: missingTeamInfo }

      await saveNewTeam(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusSend).to.have.been.calledWith('The following fields are required: location, mascot, abbreviation, conference, division')
    })
  })
})
