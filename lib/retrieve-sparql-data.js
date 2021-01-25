const { logger } = require('@vtfk/logger')
const { get } = require('axios').default
const { SPARQL_VERSION } = require('../config')

module.exports = async (type, url, query) => {
  const requestHeaders = { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }
  const request = { Query: query.replace(/\s{2,}/g, ' '), Format: 'Json', Output: 'Page', version: SPARQL_VERSION }

  try {
    logger('info', ['utils', 'extract-grep-data', type, 'post query'])
    const { data } = await get(url, { headers: requestHeaders, params: request })
    const sparqlData = data.results.bindings || []
    logger('info', ['utils', 'extract-grep-data', type, 'response', sparqlData ? sparqlData.length : 0])

    return sparqlData
  } catch (error) {
    logger('error', ['utils', 'extract-grep-data', type, 'error', error.message])
  }
}
