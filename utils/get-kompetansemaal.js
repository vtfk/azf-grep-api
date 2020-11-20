const { logger } = require('@vtfk/logger')
const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { KOMPETANSEMAAL_URL } = require('../config')
const filterExpired = require('../lib/filter-expired')
const filterVgs = require('../lib/filter-vgs')
const retrieveData = require('../lib/retrieve-data')

const getKompetansemaal = async () => {
  logger('info', ['get-kompetansemaal', 'start'])

  logger('info', ['get-kompetansemaal', 'retrieving data from', KOMPETANSEMAAL_URL])
  const { data: kompetansemaal } = await get(KOMPETANSEMAAL_URL)
  logger('info', ['get-kompetansemaal', 'retrieved', kompetansemaal.length, 'kompetansemaal'])

  logger('info', ['get-kompetansemaal', 'get detailed information about the programs'])
  // const detailedKompetansemaal = await Promise.all(kompetansemaal.map(retrieveData))

  const detailedKompetansemaal = []
  for (const maal in kompetansemaal) {
    const detailedMaal = await retrieveData(kompetansemaal[maal])
    detailedKompetansemaal.push(detailedMaal)
  }

  logger('info', ['get-kompetansemaal', 'got detailed information about', detailedKompetansemaal.length, 'programs'])

  logger('info', ['get-kompetansemaal', 'filtering out expired and kompetansemaal not for vgs'])
  const filtered = detailedKompetansemaal.filter(filterExpired).filter(filterVgs)
  logger('info', ['get-kompetansemaal', 'filtered out expired and not-vgs kompetansemaal', filtered.length, 'remains'])

  await writeFile('data/kompetansemaal.json', JSON.stringify(filtered, null, 2), { encoding: 'utf-8' })

  logger('info', ['get-kompetansemaal', 'finished'])
}

getKompetansemaal()
