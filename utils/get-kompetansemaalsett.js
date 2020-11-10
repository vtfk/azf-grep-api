const { get } = require('axios').default
const { writeFile } = require('fs').promises
const { KOMPETANSEMAALSETT_URL } = require('../config')
const filterVgs = require('../lib/filter-vgs')
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

  console.log('get-kompetansemaalsett', 'filtering out kompetansemaalsett not for vgs')
  const filtered = detailedKompetansemaalsett.filter(filterVgs)
  console.log('get-kompetansemaalsett', 'filtered out not-vgs kompetansemaalsett', filtered.length, 'remains')

  await writeFile('data/kompetansemaalsett.json', JSON.stringify(filtered, null, 2), { encoding: 'utf-8' })

  console.log('get-kompetansemaalsett', 'finished')
}

getKompetansemaalsett()
