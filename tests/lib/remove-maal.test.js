const removeMaal = require('../../lib/remove-maal')

test('it loads method correctly', () => {
  expect(typeof (removeMaal)).toBe('function')
})

test('it removes maal from object', () => {
  const utdanningsprogram = {
    kode: 'BA',
    trinn: [
      {
        kode: 'vg2',
        programomraader: [
          {
            kode: 'BAANL2----',
            maal: [
              {
                kode: 'K832'
              },
              {
                kode: 'K833'
              },
              {
                kode: 'K834'
              }
            ]
          },
          {
            kode: 'BABYG2----',
            maal: [
              {
                kode: 'K684'
              },
              {
                kode: 'K685'
              }
            ]
          }
        ]
      }
    ]
  }

  const withoutMaal = {
    kode: 'BA',
    trinn: [
      {
        kode: 'vg2',
        programomraader: [
          {
            kode: 'BAANL2----'
          },
          {
            kode: 'BABYG2----'
          }
        ]
      }
    ]
  }

  expect(removeMaal(utdanningsprogram)).toEqual(withoutMaal)
})
