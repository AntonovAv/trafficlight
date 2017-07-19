const bindings = require('bindings')({
  bindings: 'addon.node',
  module_root: __dirname
})

module.exports.hello = function() {
  console.log(bindings.hello())
}

module.exports.open = function(dev, addr) {
  bindings.open(dev, addr)
}

module.exports.setDuty = function() {
  bindings.setDuty()
}