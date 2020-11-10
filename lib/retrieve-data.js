const { get } = require('axios').default

const maxRetries = 10
module.exports = async (grepObj) => {
  // Use url-data as default, but fallback to input as url if the url field wasn't found.
  const url = grepObj['url-data'] || grepObj
  console.log('retrieve-data', 'retrieving data from', url)

  // Loop until the max retries is reached!
  let retries = maxRetries
  while (retries-- > 0) {
    try {
      const { data } = await get(url)
      return data
    } catch (error) {
      console.log('retrieve-data', url, 'err', error.message, 'will retry', (retries), 'more times')
    }
  }

  // If we get here, throw error!
  throw new Error(`Unable to get data from ${url} after ${maxRetries} retries!`)
}
