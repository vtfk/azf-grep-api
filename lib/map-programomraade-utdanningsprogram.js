const programomraader = require('../data/matched-programomraader.json')

module.exports = (utdanningsprogram) => {
  const matchingProgramomraader = programomraader
    .filter(prog => prog['utdanningsprogram-referanse']
      .filter(utd => utd.kode === utdanningsprogram.kode).length > 0)

  return {
    ...utdanningsprogram,
    programomraader: matchingProgramomraader
  }
}
