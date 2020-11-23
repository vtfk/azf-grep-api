module.exports = ({ trinn, ...rest }) => ({
  ...rest,
  trinn: trinn.map(({ programomraader, ...rest }) => ({
    ...rest,
    programomraader: programomraader.map(({ maal, ...rest }) => rest)
  }))
})
