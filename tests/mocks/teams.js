const teamsList = [{
  id: 1,
  location: 'Buffalo',
  mascot: 'Bills',
  abbreviation: 'BUF',
  conference: 'AFC',
  division: 'East'
}, {
  id: 2,
  location: 'Miami',
  mascot: 'Dolphins',
  abbreviation: 'MIA',
  conference: 'AFC',
  division: 'East'
}]

const singleTeam = {
  id: 12,
  location: 'Tennessee',
  mascot: 'Titans',
  abbreviation: 'TEN',
  conference: 'AFC',
  division: 'North'
}

const createTeam = {
  location: 'Tennessee',
  mascot: 'Titans',
  abbreviation: 'TEN',
  conference: 'AFC',
  division: 'North'
}

const missingTeamInfo = {
  mascot: 'Titans',
  abbreviation: 'TEN',
  conference: 'AFC',
  division: 'North'
}

module.exports = { teamsList, singleTeam, createTeam, missingTeamInfo }
