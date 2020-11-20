const { logger } = require('@vtfk/logger')
const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { UTDANNINGSPROGRAM_URL } = require('../config')
const filterExpired = require('../lib/filter-expired')
const retrieveData = require('../lib/retrieve-data')

const getUtdanningsprogram = async () => {
  logger('info', ['get-utdanningsprogram', 'start'])

  logger('info', ['get-utdanningsprogram', 'retrieving data from', UTDANNINGSPROGRAM_URL])
  const { data: utdanningsprogram } = await get(UTDANNINGSPROGRAM_URL)
  logger('info', ['get-utdanningsprogram', 'retrieved', utdanningsprogram.length, 'utdanningsprogram'])

  logger('info', ['get-utdanningsprogram', 'get detailed information about the programs'])
  const detailedUtdanningsprogram = await Promise.all(utdanningsprogram.map(retrieveData))
  logger('info', ['get-utdanningsprogram', 'got detailed information about', detailedUtdanningsprogram.length, 'programs'])

  logger('info', ['get-utdanningsprogram', 'filtering out expired utdanningsprogram'])
  const filtered = detailedUtdanningsprogram.filter(filterExpired)
  logger('info', ['get-utdanningsprogram', 'filtered out expired utdanningsprogram', filtered.length, 'remains'])

  await writeFile('data/utdanningsprogrammer.json', JSON.stringify(filtered, null, 2), { encoding: 'utf-8' })

  logger('info', ['get-utdanningsprogram', 'finished'])
}

getUtdanningsprogram()
