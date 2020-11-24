const incasesensitiveEquals = require('../../lib/incasesensitive-equals')

test('it loads method correctly', () => {
  expect(typeof (incasesensitiveEquals)).toBe('function')
})

it('returns true if two different cased values is passed', () => {
  expect(incasesensitiveEquals('HEI', 'hei')).toBe(true)
})

it('returns true if two equally cased values is passed', () => {
  expect(incasesensitiveEquals('HEI', 'HEI')).toBe(true)
})

it('returns false if two different values is passed', () => {
  expect(incasesensitiveEquals('Hei', 'Hade')).toBe(false)
})
