const { logConfig, logger } = require('@vtfk/logger')
const getResponseObject = require('../lib/get-response-object')

const utdanningsprogrammer = require('../data/data.json')

const removeProgramomraader = ({ programomraader, ...rest }) => {
  return { ...rest }
}

module.exports = async function (context, req) {
  logConfig({ prefix: context.invocationId, localLogger: context.log })
  const { returnChildrens } = req.query

  logger('info', ['get-utdanningsprogram', 'returning utdanningsprogrammer', (returnChildrens ? 'return all childs' : 'remove programomraader')])

  if (returnChildrens) return getResponseObject(utdanningsprogrammer)
  return getResponseObject([...utdanningsprogrammer].map(({ trinn, ...rest }) => ({ ...rest, trinn: [...trinn].map(removeProgramomraader) })))
}
