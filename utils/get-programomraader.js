const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { PROGRAMOMRADER_URL } = require('../config')
const retrieveData = require('../lib/retrieve-data')

const getProgramomraader = async () => {
  console.log('get-programomraader', 'start')

  console.log('get-programomraader', 'retrieving data from', PROGRAMOMRADER_URL)
  const { data: programomraader } = await get(PROGRAMOMRADER_URL)
  console.log('get-programomraader', 'retrieved', programomraader.length, 'programomraader')

  console.log('get-programomraader', 'get detailed information about the programs')
  const detailedProgramomraader = await Promise.all(programomraader.map(retrieveData))
  console.log('get-programomraader', 'got detailed information about', detailedProgramomraader.length, 'programs')

  await writeFile('data/programomraader.json', JSON.stringify(detailedProgramomraader, null, 2), { encoding: 'utf-8' })

  console.log('get-programomraader', 'finished')
}

getProgramomraader()
