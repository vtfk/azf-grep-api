const { logger } = require('@vtfk/logger')
const { post } = require('axios').default
const { stringify } = require('qs')
const { SPARQL_URL, PROGFAG_QUERY } = require('../config')
const repackUdirSparql = require('../lib/repack-udir-data')

const retrieveData = async (type, url, query) => {
  const requestHeaders = { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }
  const request = stringify({ query })

  try {
    logger('info', ['utils', 'extract-grep-data', type, 'post query'])
    const { data } = await post(url, request, { headers: requestHeaders })
    const sparqlData = data.results.bindings || []
    logger('info', ['utils', 'extract-grep-data', type, 'response', sparqlData.length])

    return repackUdirSparql(sparqlData)
  } catch (error) {
    logger('error', ['utils', 'extract-grep-data', type, 'error', error.message])
  }
}

module.exports = () => {
  return retrieveData('programfag', SPARQL_URL, PROGFAG_QUERY)
}
