module.exports = (obj) => {
  return !(/status_utgaatt/.test(obj.status))
}
