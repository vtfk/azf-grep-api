const { logger } = require('@vtfk/logger')
const { writeFile } = require('fs').promises
const retrieveSparqlData = require('../lib/retrieve-sparql-data')

const getSparqlData = async () => {
  logger('info', ['get-sparql-data', 'start'])

  logger('info', ['get-sparql-data', 'retrieving data from sparql endpoint'])
  const data = await retrieveSparqlData()
  logger('info', ['get-sparql-data', 'retrieved', data.length, 'utdanningsprogram'])

  await writeFile('data/sparql-data.json', JSON.stringify(data, null, 2), { encoding: 'utf-8' })

  logger('info', ['get-sparql-data', 'finished'])
}

getSparqlData()
