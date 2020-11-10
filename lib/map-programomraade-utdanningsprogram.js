const programomraader = require('../data/matched-programomraader.json')

module.exports = (utdanningsprogram) => {
  const matchingProgramomraader = programomraader
    .filter(prog => prog['utdanningsprogram-referanse']
      .filter(utd => utd.kode === utdanningsprogram.kode).length > 0)

  // Remove unnessecarry fields from utdanningsprogram
  delete utdanningsprogram.tilleggsopplysninger
  delete utdanningsprogram.erstatter
  delete utdanningsprogram['erstattes-av']
  delete utdanningsprogram['foerste-semester']
  delete utdanningsprogram['siste-semester']

  return {
    ...utdanningsprogram,
    programomraader: matchingProgramomraader
  }
}
