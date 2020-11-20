const { logger } = require('@vtfk/logger')
const { post } = require('axios').default
const { stringify } = require('qs')

module.exports = async (type, url, query) => {
  const requestHeaders = { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }
  const request = stringify({ query })

  try {
    logger('info', ['utils', 'extract-grep-data', type, 'post query'])
    const { data } = await post(url, request, { headers: requestHeaders })
    const sparqlData = data.results.bindings || []
    logger('info', ['utils', 'extract-grep-data', type, 'response', sparqlData.length])

    return sparqlData
  } catch (error) {
    logger('error', ['utils', 'extract-grep-data', type, 'error', error.message])
  }
}