const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { PROGRAMOMRADER_URL } = require('../config')
const filterExpired = require('../lib/filter-expired')
const filterVgs = require('../lib/filter-vgs')
const retrieveData = require('../lib/retrieve-data')

const getProgramomraader = async () => {
  console.log('get-programomraader', 'start')

  console.log('get-programomraader', 'retrieving data from', PROGRAMOMRADER_URL)
  const { data: programomraader } = await get(PROGRAMOMRADER_URL)
  console.log('get-programomraader', 'retrieved', programomraader.length, 'programomraader')

  console.log('get-programomraader', 'get detailed information about the programs')
  const detailedProgramomraader = await Promise.all(programomraader.map(retrieveData))
  console.log('get-programomraader', 'got detailed information about', detailedProgramomraader.length, 'programs')

  console.log('get-programomraader', 'filtering out expired and programomraader not for vgs')
  const filtered = detailedProgramomraader.filter(filterExpired).filter(filterVgs)
  console.log('get-programomraader', 'filtered out expired and not-vgs programomraader', filtered.length, 'remains')

  await writeFile('data/programomraader.json', JSON.stringify(filtered, null, 2), { encoding: 'utf-8' })

  console.log('get-programomraader', 'finished')
}

getProgramomraader()
