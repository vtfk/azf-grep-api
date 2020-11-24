const repackTitle = require('../../lib/repack-title')

test('it loads repack method correctly', () => {
  expect(typeof (repackTitle)).toBe('function')
})

test('it returns repacked titles', () => {
  const originalTitles = [
    {
      spraak: 'nob',
      verdi: 'Anleggsteknikk'
    },
    {
      spraak: 'eng',
      verdi: 'Construction'
    },
    {
      spraak: 'nno',
      verdi: 'Anleggsteknikk'
    },
    {
      spraak: 'default',
      verdi: 'Anleggsteknikk'
    }
  ]

  const repacked = {
    nb: 'Anleggsteknikk',
    nn: 'Anleggsteknikk',
    en: 'Construction'
  }

  expect(repackTitle(originalTitles)).toEqual(repacked)
})

test('it returns repacked lk20 titles', () => {
  const originalTitles = {
    tekst: [
      {
        spraak: 'default',
        verdi: 'Standardverdi'
      },
      {
        spraak: 'nob',
        verdi: 'Norsk bokmål'
      },
      {
        spraak: 'nno',
        verdi: 'Norsk nynorsk'
      },
      {
        spraak: 'eng',
        verdi: 'Engelsk'
      }
    ],
    forskrift: true
  }

  const repacked = {
    nb: 'Norsk bokmål',
    nn: 'Norsk nynorsk',
    en: 'Engelsk'
  }

  expect(repackTitle(originalTitles)).toEqual(repacked)
})

test('it returns default when there is no value for that language', () => {
  const originalTitles = [
    {
      spraak: 'nob',
      verdi: 'Anleggsteknikk'
    },
    {
      spraak: 'default',
      verdi: 'Anleggsteknikk'
    }
  ]
  const repacked = {
    nb: 'Anleggsteknikk',
    nn: 'Anleggsteknikk',
    en: 'Anleggsteknikk'
  }

  expect(repackTitle(originalTitles)).toEqual(repacked)
})
