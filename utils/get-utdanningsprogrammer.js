const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { UTDANNINGSPROGRAM_URL } = require('../config')
const filterExpired = require('../lib/filter-expired')
const retrieveData = require('../lib/retrieve-data')

const getUtdanningsprogram = async () => {
  console.log('get-utdanningsprogram', 'start')

  console.log('get-utdanningsprogram', 'retrieving data from', UTDANNINGSPROGRAM_URL)
  const { data: utdanningsprogram } = await get(UTDANNINGSPROGRAM_URL)
  console.log('get-utdanningsprogram', 'retrieved', utdanningsprogram.length, 'utdanningsprogram')

  console.log('get-utdanningsprogram', 'get detailed information about the programs')
  const detailedUtdanningsprogram = await Promise.all(utdanningsprogram.map(retrieveData))
  console.log('get-utdanningsprogram', 'got detailed information about', detailedUtdanningsprogram.length, 'programs')

  console.log('get-utdanningsprogram', 'filtering out expired utdanningsprogram')
  const filtered = detailedUtdanningsprogram.filter(filterExpired)
  console.log('get-utdanningsprogram', 'filtered out expired utdanningsprogram', filtered.length, 'remains')

  await writeFile('data/utdanningsprogrammer.json', JSON.stringify(filtered, null, 2), { encoding: 'utf-8' })

  console.log('get-utdanningsprogram', 'finished')
}

getUtdanningsprogram()
