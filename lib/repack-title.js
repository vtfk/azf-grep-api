module.exports = (titleObj) => {
  // lk20 is packed in ".tekst"
  if (titleObj.tekst) titleObj = titleObj.tekst

  const titles = {}
  titleObj.forEach(title => {
    const spraak = title.spraak.match(/[^/]+(?=$)/g)[0]
    titles[spraak] = title.verdi
  })

  // Return in ISO 639-1-format
  return {
    nb: titles.nob || titles.default,
    nn: titles.nno || titles.default,
    en: titles.eng || titles.default
  }
}
