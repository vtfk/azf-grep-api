const udirUtdanningsprogrammer = require('../data/utdanningsprogrammer.json')
const udirProgramomraader = require('../data/programomraader.json')

const getValue = (obj) => {
  if (!obj) return undefined
  if (!obj.value) return undefined
  return obj.value
}

const repackTitles = (titleObj) => {
  const titles = {}
  titleObj.forEach(title => {
    const spraak = title.spraak.match(/[^/]+(?=$)/g)[0]
    titles[spraak] = title.verdi
  })
  return titles
}

module.exports = (sparlData) => {
  const utdanningsprogramKoder = [...new Set(sparlData.map(obj => getValue(obj.up_kode)))]

  const utdanningsprogrammer = utdanningsprogramKoder.map(utdkode => {
    const utdanningsprogram = udirUtdanningsprogrammer.filter(utd => utd.kode === utdkode)[0]
    const utdProgObj = sparlData.filter(obj => obj.up_kode.value === utdkode)
    const trinns = [...new Set(utdProgObj.map(obj => getValue(obj.trinn)))]

    const trinn = trinns.map(trinn => {
      const progomraaderObj = utdProgObj.filter(obj => obj.trinn.value === trinn)
      const progomraadeKoder = [...new Set(progomraaderObj.map(obj => getValue(obj.po_kode)))]

      const programomraader = progomraadeKoder.map(progkode => {
        const programomraade = udirProgramomraader.filter(prog => prog.kode === progkode)[0]
        const maalObj = progomraaderObj.filter(obj => obj.po_kode.value === progkode)
        const maal = maalObj.map(obj => {
          return {
            kode: getValue(obj.km_kode),
            maal: getValue(obj.km_tittel)
          }
        })

        return {
          kode: programomraade.kode,
          'url-data': programomraade['url-data'],
          tittel: repackTitles(programomraade.tittel),
          kompetansemaal: maal
        }
      })

      return {
        trinn,
        programomraader
      }
    })

    return {
      kode: utdkode,
      'url-data': utdanningsprogram['url-data'],
      tittel: repackTitles(utdanningsprogram.tittel),
      trinn
    }
  })

  return utdanningsprogrammer
}
