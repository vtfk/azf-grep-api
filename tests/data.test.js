it('finds and loads data.json correct', async () => {
  expect(() => require('../data/data.json')).not.toThrow()
})
