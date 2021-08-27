const { logger } = require('@vtfk/logger')
const { get } = require('axios').default

module.exports = async (type, url, query) => {
  const requestHeaders = { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }
  query = encodeURIComponent(query)

  try {
    logger('info', ['utils', 'extract-grep-data', type, 'get query'])
    const { data } = await get(`${url}?query=${query}`, { headers: requestHeaders })
    const sparqlData = data.results.bindings || []
    logger('info', ['utils', 'extract-grep-data', type, 'response', sparqlData ? sparqlData.length : 0])

    return sparqlData
  } catch (error) {
    logger('error', ['utils', 'extract-grep-data', type, 'error', error.message])
  }
}
