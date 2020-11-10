const opplaeringsfag = require('../data/matched-opplaeringsfag.json')

module.exports = (programomraade) => {
  const matchingOpplaeringsfag = opplaeringsfag
    .filter(fag => fag['programomraader-referanse']
      .filter(prog => prog.kode === programomraade.kode).length > 0)

  // Remove unnessecarry fields from programomraade
  delete programomraade['bygger-paa-programomraade']
  delete programomraade['programomraade-type']
  delete programomraade['aarstimer-formgivningsfag']
  delete programomraade['aarstimer-doeve-og-tunghoerte']
  delete programomraade['aarstimer-samisk']
  delete programomraade.aarstimer
  delete programomraade.opplaeringssted
  delete programomraade.merkelapper
  delete programomraade.sluttkompetanse

  return {
    ...programomraade,
    opplaeringsfag: matchingOpplaeringsfag
  }
}
