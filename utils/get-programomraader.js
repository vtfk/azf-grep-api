const { logger } = require('@vtfk/logger')
const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { PROGRAMOMRADER_URL } = require('../config')
const filterExpired = require('../lib/filter-expired')
const filterVgs = require('../lib/filter-vgs')
const retrieveData = require('../lib/retrieve-data')

const getProgramomraader = async () => {
  logger('info', ['get-programomraader', 'start'])

  logger('info', ['get-programomraader', 'retrieving data from', PROGRAMOMRADER_URL])
  const { data: programomraader } = await get(PROGRAMOMRADER_URL)
  logger('info', ['get-programomraader', 'retrieved', programomraader.length, 'programomraader'])

  logger('info', ['get-programomraader', 'get detailed information about the programs'])
  const detailedProgramomraader = await Promise.all(programomraader.map(retrieveData))
  logger('info', ['get-programomraader', 'got detailed information about', detailedProgramomraader.length, 'programs'])

  logger('info', ['get-programomraader', 'filtering out expired and programomraader not for vgs'])
  const filtered = detailedProgramomraader.filter(filterExpired).filter(filterVgs)
  logger('info', ['get-programomraader', 'filtered out expired and not-vgs programomraader', filtered.length, 'remains'])

  await writeFile('data/programomraader.json', JSON.stringify(filtered, null, 2), { encoding: 'utf-8' })

  logger('info', ['get-programomraader', 'finished'])
}

getProgramomraader()
