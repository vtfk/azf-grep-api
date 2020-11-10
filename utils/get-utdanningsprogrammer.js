const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { UTDANNINGSPROGRAM_URL } = require('../config')
const retrieveData = require('../lib/retrieve-data')

const getUtdanningsprogram = async () => {
  console.log('get-utdanningsprogram', 'start')

  console.log('get-utdanningsprogram', 'retrieving data from', UTDANNINGSPROGRAM_URL)
  const { data: utdanningsprogram } = await get(UTDANNINGSPROGRAM_URL)
  console.log('get-utdanningsprogram', 'retrieved', utdanningsprogram.length, 'utdanningsprogram')

  console.log('get-utdanningsprogram', 'get detailed information about the programs')
  const detailedUtdanningsprogram = await Promise.all(utdanningsprogram.map(retrieveData))
  console.log('get-utdanningsprogram', 'got detailed information about', detailedUtdanningsprogram.length, 'programs')

  await writeFile('data/utdanningsprogrammer.json', JSON.stringify(detailedUtdanningsprogram, null, 2), { encoding: 'utf-8' })

  console.log('get-utdanningsprogram', 'finished')
}

getUtdanningsprogram()
