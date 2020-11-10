const { writeFile } = require('fs').promises
const mapOpplaeringsfag = require('../lib/map-opplaeringsfag-programomraade')

const matchProgramomraade = async () => {
  console.log('match-programomraade', 'start')

  console.log('match-programomraade', 'loading programomraade')
  const programomraade = require('../data/programomraader.json')
  console.log('match-programomraade', 'loaded', programomraade.length, 'programomraade')

  console.log('match-programomraade', 'matching programomraade with kompetansemaalsett')

  const matchedProgramomraade = programomraade.map(mapOpplaeringsfag).filter(ofag => ofag !== null)

  console.log('match-programomraade', 'matched', matchedProgramomraade.length, 'programomraade')

  await writeFile('data/matched-programomraader.json', JSON.stringify(matchedProgramomraade, null, 2), { encoding: 'utf-8' })

  console.log('match-programomraade', 'finished')
}

matchProgramomraade()
