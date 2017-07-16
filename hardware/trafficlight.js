const bindings = require('bindings')({
  bindings: 'addon.node',
  module_root: __dirname
})

module.exports.hello = function() {
  console.log(bindings.hello())
}
