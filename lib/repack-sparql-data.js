const retrieveData = require('./retrieve-data')

const getValue = (obj) => {
  if (!obj) return undefined
  if (!obj.value) return undefined
  return obj.value
}

const repackTitles = (titleObj) => {
  // lk20 is packed in ".tekst"
  if (titleObj.tekst) titleObj = titleObj.tekst

  const titles = {}
  titleObj.forEach(title => {
    const spraak = title.spraak.match(/[^/]+(?=$)/g)[0]
    titles[spraak] = title.verdi
  })
  return titles
}

const getDistrinctProp = (data, prop) => {
  return [...new Set(data.map(obj => getValue(obj[prop])))]
}

const getMaal = async (url) => {
  const maal = await retrieveData(url)
  return {
    kode: maal.kode,
    'url-data': maal['url-data'],
    tittel: repackTitles(maal.tittel)
  }
}

const getProgramomraade = async (sparqlData, url) => {
  const programomraade = await retrieveData(url)

  const uniqueUrl = getDistrinctProp(sparqlData, 'km_url_data')
  const maal = await Promise.all(uniqueUrl.map(async url => await getMaal(url)))

  return {
    kode: programomraade.kode,
    'url-data': programomraade['url-data'],
    tittel: repackTitles(programomraade.tittel),
    maal
  }
}

const getTrinn = async (sparqlData, url) => {
  const trinn = await retrieveData(url)
  const programomraader = []

  const uniqueUrl = getDistrinctProp(sparqlData, 'po_url_data')
  for (const index in uniqueUrl) {
    const url = uniqueUrl[index]

    const sqlProgomraade = sparqlData.filter(obj => obj.po_url_data.value === url)
    const programomraade = await getProgramomraade(sqlProgomraade, url)
    programomraader.push(programomraade)
  }

  return {
    kode: trinn.kode,
    'url-data': trinn['url-data'],
    tittel: repackTitles(trinn.tittel),
    programomraader
  }
}

const getUtdanningsprogram = async (sparqlData, url) => {
  const utdanningsprogram = await retrieveData(url)
  const trinn = []

  const uniqueUrl = getDistrinctProp(sparqlData, 'trinn_url_data')
  for (const index in uniqueUrl) {
    const url = uniqueUrl[index]

    const sqlTrinn = sparqlData.filter(obj => obj.trinn_url_data.value === url)
    const trinnObj = await getTrinn(sqlTrinn, url)
    trinn.push(trinnObj)
  }

  return {
    kode: utdanningsprogram.kode,
    'url-data': utdanningsprogram['url-data'],
    tittel: repackTitles(utdanningsprogram.tittel),
    trinn
  }
}

module.exports = async (sparqlData) => {
  const utdanningsprogrammer = []
  const uniqueUrl = getDistrinctProp(sparqlData, 'up_url_data')
  for (const index in uniqueUrl) {
    const url = uniqueUrl[index]

    const sqlUtdprog = sparqlData.filter(obj => obj.up_url_data.value === url)
    const utdanningsprogram = await getUtdanningsprogram(sqlUtdprog, url)
    utdanningsprogrammer.push(utdanningsprogram)
  }

  return utdanningsprogrammer

  /*
  for (const utdProgUrlI in ) {
    const utdProgUrl =
    const utdanningsprogram = await retrieveData(utdProgUrl)
    console.log(utdanningsprogram)
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

    utdanningsprogrammer.push({
      kode: getValue(utdanningsprogram.kode),
      'url-data': utdanningsprogram['url-data'],
      tittel: repackTitles(utdanningsprogram.tittel),
      trinn
    })
  }
*/
}
