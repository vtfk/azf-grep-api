const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { KOMPETANSEMAALSETT_URL } = require('../config')
const retrieveData = require('../lib/retrieve-data')

const getKompetansemaalsett = async () => {
  console.log('get-kompetansemaalsett', 'start')

  console.log('get-kompetansemaalsett', 'retrieving data from', KOMPETANSEMAALSETT_URL)
  const { data: kompetansemaalsett } = await get(KOMPETANSEMAALSETT_URL)
  console.log('get-kompetansemaalsett', 'retrieved', kompetansemaalsett.length, 'kompetansemaalsett')

  console.log('get-kompetansemaalsett', 'get detailed information for the kompetansemaalsett')

  const detailedKompetansemaalsett = []
  for (const maalsett in kompetansemaalsett) {
    const detailedMaal = await retrieveData(kompetansemaalsett[maalsett])
    detailedKompetansemaalsett.push(detailedMaal)
  }

  console.log('get-kompetansemaalsett', 'got detailed information about', detailedKompetansemaalsett.length, 'kompetansemaalsett')

  await writeFile('data/kompetansemaalsett.json', JSON.stringify(detailedKompetansemaalsett, null, 2), { encoding: 'utf-8' })

  console.log('get-kompetansemaalsett', 'finished')
}

getKompetansemaalsett()
