'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _reactDecompiler = require('react-decompiler');

var isReact = _reactAddons2['default'].addons.TestUtils.isElement;

var formatReactComponents = function formatReactComponents(defaultFormatter) {
  return function (value) {
    return isReact(value) ? '\n' + (0, _reactDecompiler.formatted)(value) + '\n' : defaultFormatter(value);
  };
};

var patchJasmine = function patchJasmine(jasmine) {
  return jasmine.pp = formatReactComponents(jasmine.pp);
};

var install = patchJasmine;
exports.install = install;
exports['default'] = { install: patchJasmine };
