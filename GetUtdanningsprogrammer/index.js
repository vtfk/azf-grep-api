const { logConfig, logger } = require('@vtfk/logger')
const getResponseObject = require('../lib/get-response-object')

const utdanningsprogrammer = require('../data/data.json')
const removeMaal = require('../lib/remove-maal')

module.exports = async function (context, req) {
  logConfig({ prefix: context.invocationId, localLogger: context.log })
  const { full } = req.query
  const returnFull = full && full.toLowerCase() === 'true'

  logger('info', ['get-utdanningsprogram', 'returning utdanningsprogrammer', (returnFull ? 'full objects ' : 'remove maal')])

  if (returnFull) return getResponseObject(utdanningsprogrammer)
  return getResponseObject(utdanningsprogrammer.map(removeMaal))
}
