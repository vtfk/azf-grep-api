const { logConfig, logger } = require('@vtfk/logger')
const getResponseObject = require('../lib/get-response-object')

const utdanningsprogrammer = require('../data/data.json')

module.exports = async function (context, req) {
  logConfig({ prefix: context.invocationId, localLogger: context.log })
  const { full } = req.query
  const returnFull = full.toLowerCase() === 'true'

  logger('info', ['get-utdanningsprogram', 'returning utdanningsprogrammer', (returnFull ? 'full objects ' : 'remove trinn')])

  if (returnFull) return getResponseObject(utdanningsprogrammer)
  return getResponseObject([...utdanningsprogrammer].map(({ trinn, ...rest }) => ({ ...rest, trinn: undefined })))
}
