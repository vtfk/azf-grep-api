module.exports = (obj) => {
  const arrayMatch = obj['benyttes-paa-aarstrinn'] || obj['for-aarstrinn'] || false
  if (arrayMatch) {
    return arrayMatch.filter(trinn => /^vg/.test(trinn.kode.toLowerCase())).length > 0
  }

  const kode = obj.aarstrinn ? obj.aarstrinn.kode : null
  if (!kode) return true
  return /^vg/.test(kode.toLowerCase()) // Should start with "vg"
}
