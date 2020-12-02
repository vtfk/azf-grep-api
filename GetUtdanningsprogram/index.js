const { logConfig, logger } = require('@vtfk/logger')
const getResponseObject = require('../lib/get-response-object')
const HTTPError = require('../lib/http-error')
const ieq = require('../lib/incasesensitive-equals')

const utdanningsprogrammer = require('../data/data.json')

module.exports = async function (context, req) {
  logConfig({ azure: { context }, prefix: 'get-utdanningsprogram' })
  const { kode } = req.params

  logger('info', ['returning utdanningsprogram', kode])

  const utdanningsprogram = utdanningsprogrammer.filter(prog => ieq(prog.kode, kode))[0]
  if (!utdanningsprogram) {
    logger('info', ['returning utdanningsprogram', kode, 'not found'])
    return new HTTPError(404, 'Utdanningsprogram ikke funnet', { kode }).toJSON()
  }

  return getResponseObject(utdanningsprogram)
}
