'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactDecompiler = require('react-decompiler');

var formatReactComponents = function formatReactComponents(defaultFormatter) {
  return function (value) {
    return (0, _reactAddonsTestUtils.isElement)(value) ? '\n' + (0, _reactDecompiler.formatted)(value) + '\n' : defaultFormatter(value);
  };
};

var patchJasmine = function patchJasmine(jasmine) {
  return jasmine.pp = formatReactComponents(jasmine.pp);
};

var install = patchJasmine;
exports.install = install;
exports['default'] = { install: patchJasmine };
