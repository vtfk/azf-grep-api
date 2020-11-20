const { logger } = require('@vtfk/logger')
const { writeFile } = require('fs').promises
const retrieveSparqlData = require('../lib/retrieve-sparql-data')
const repackSparqlData = require('../lib/repack-sparql-data')
const { SPARQL_URL, PROGFAG_QUERY } = require('../config')

const getSparqlData = async () => {
  logger('info', ['get-sparql-data', 'start'])

  logger('info', ['get-sparql-data', 'retrieving data from sparql endpoint'])
  const data = await retrieveSparqlData('programfag', SPARQL_URL, PROGFAG_QUERY)
  logger('info', ['get-sparql-data', 'retrieved', data.length, 'utdanningsprogram'])

  await writeFile('data/sparql-data.json', JSON.stringify(data, null, 2), { encoding: 'utf-8' })

  logger('info', ['get-sparql-data', 'repacking data'])
  const repackedData = await repackSparqlData(data)
  logger('info', ['get-sparql-data', 'repacked data'])

  await writeFile('data/data.json', JSON.stringify(repackedData, null, 2), { encoding: 'utf-8' })

  logger('info', ['get-sparql-data', 'finished'])
}

getSparqlData()
