const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { OPPLAERINGSFAG_URL } = require('../config')
const retrieveData = require('../lib/retrieve-data')

const getOpplaeringsfag = async () => {
  console.log('get-opplaeringsfag', 'start')

  console.log('get-opplaeringsfag', 'retrieving data from', OPPLAERINGSFAG_URL)
  const { data: opplaeringsfag } = await get(OPPLAERINGSFAG_URL)
  console.log('get-opplaeringsfag', 'retrieved', opplaeringsfag.length, 'opplaeringsfag')

  console.log('get-opplaeringsfag', 'get detailed information for the opplaeringsfag')
  const detailedOpplaeringsfag = await Promise.all(opplaeringsfag.map(retrieveData))
  console.log('get-opplaeringsfag', 'got detailed information about', detailedOpplaeringsfag.length, 'opplaeringsfag')

  await writeFile('data/opplaeringsfag.json', JSON.stringify(detailedOpplaeringsfag, null, 2), { encoding: 'utf-8' })

  console.log('get-opplaeringsfag', 'finished')
}

getOpplaeringsfag()
