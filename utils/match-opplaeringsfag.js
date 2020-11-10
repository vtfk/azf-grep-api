const { writeFile } = require('fs').promises
const mapKompetansemaalsett = require('../lib/map-kompetansemaalsett-opplaeringsfag')

const matchOpplaeringsfag = async () => {
  console.log('match-opplaeringsfag', 'start')

  console.log('match-opplaeringsfag', 'loading opplaeringsfag')
  const opplaeringsfag = require('../data/opplaeringsfag.json')
  console.log('match-opplaeringsfag', 'loaded', opplaeringsfag.length, 'opplaeringsfag')

  console.log('match-opplaeringsfag', 'matching opplaeringsfag with kompetansemaalsett')

  const matchedOpplaeringsfag = opplaeringsfag.map(mapKompetansemaalsett).filter(ofag => ofag !== null)

  console.log('match-opplaeringsfag', 'matched', matchedOpplaeringsfag.length, 'opplaeringsfag')

  await writeFile('data/matched-opplaeringsfag.json', JSON.stringify(matchedOpplaeringsfag, null, 2), { encoding: 'utf-8' })

  console.log('match-opplaeringsfag', 'finished')
}

matchOpplaeringsfag()
