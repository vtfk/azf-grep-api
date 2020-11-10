const { writeFile } = require('fs').promises
const mapProgramomraade = require('../lib/map-programomraade-utdanningsprogram')

const matchUtdanningsprogram = async () => {
  console.log('match-utdanningsprogram', 'start')

  console.log('match-utdanningsprogram', 'loading utdanningsprogram')
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')
  console.log('match-utdanningsprogram', 'loaded', utdanningsprogrammer.length, 'utdanningsprogram')

  console.log('match-utdanningsprogram', 'matching utdanningsprogram with kompetansemaalsett')

  const matchedUtdanningsprogram = utdanningsprogrammer.map(mapProgramomraade).filter(ofag => ofag !== null)

  console.log('match-utdanningsprogram', 'matched', matchedUtdanningsprogram.length, 'utdanningsprogram')

  await writeFile('data/matched-utdanningsprogrammer.json', JSON.stringify(matchedUtdanningsprogram, null, 2), { encoding: 'utf-8' })

  console.log('match-utdanningsprogram', 'finished')
}

matchUtdanningsprogram()
