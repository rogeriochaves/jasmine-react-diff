var React = require('react/addons');
var Decompiler = require('react-decompiler');

module.exports.install = function (jasmine) {
  function patchPrettyPrinter (originalPrettyPrinter) {
    jasmine.pp = function (value) {
      if (React.addons.TestUtils.isElement(value)) {
        return Decompiler.formatted(value);
      }

      return originalPrettyPrinter.apply(this, arguments);
    }
  }

  patchPrettyPrinter(jasmine.pp);
};
