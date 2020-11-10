const opplaeringsfag = require('../data/matched-opplaeringsfag.json')

module.exports = (programomraade) => {
  const matchingOpplaeringsfag = opplaeringsfag
    .filter(fag => fag['programomraader-referanse']
      .filter(prog => prog.kode === programomraade.kode).length > 0)

  return {
    ...programomraade,
    opplaeringsfag: matchingOpplaeringsfag
  }
}
