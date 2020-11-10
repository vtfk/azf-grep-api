const kompetansemaalsett = require('../data/kompetansemaalsett.json')

const getAktiveKompetansemaalsett = (kompmaalsett) => {
  if (!kompmaalsett || !kompmaalsett.gyldighet) return false

  const now = new Date()

  const start = kompmaalsett.gyldighet['gyldig-fra']
  const end = kompmaalsett.gyldighet['gyldig-til']

  if (!start && !end) return true // No date set = active 🤪

  const startDate = new Date(start)
  const endDate = new Date(end)

  if (startDate > now) return false // Not valid yet
  if (endDate < now) return false // Expired
  return true // Valid and not expired!
}

const getKompetansemaalsettObj = (ref) => {
  if (!ref.kode) return null
  return kompetansemaalsett.filter(sett => sett.kode === ref.kode)
}

module.exports = (opplaeringsfag) => {
  const laereplanrefs = opplaeringsfag['laereplan-referanse']
  if (!laereplanrefs) return null

  const tilhorendeKompmaaalsett = laereplanrefs.map(laereplanref => laereplanref['tilhoerende-kompetansemaalsett']).flat()
  const aktiveKompmaalsett = tilhorendeKompmaaalsett.filter(getAktiveKompetansemaalsett)
  const kompetansemaalsett = aktiveKompmaalsett.map(getKompetansemaalsettObj).flat().filter(sett => sett !== null)
  if (kompetansemaalsett.length === 0) return null

  return {
    ...opplaeringsfag,
    kompetansemaalsett
  }
}
