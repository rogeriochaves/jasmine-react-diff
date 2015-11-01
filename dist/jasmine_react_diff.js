'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactDecompiler = require('react-decompiler');

var formatReactComponents = function formatReactComponents(defaultFormatter, jumpingLine) {
  return function (value) {
    if (Array.isArray(value) && value.some(_reactAddonsTestUtils.isElement)) {
      return formatReactArray(defaultFormatter)(value);
    }

    if ((0, _reactAddonsTestUtils.isElement)(value)) {
      return formatReactValue(value, jumpingLine);
    }

    return defaultFormatter(value);
  };
};

var formatReactArray = function formatReactArray(defaultFormatter) {
  return function (array) {
    return '[\n  ' + array.map(formatReactComponents(defaultFormatter, false)).join(',\n  ') + '\n]';
  };
};

var formatReactValue = function formatReactValue(value) {
  var jumpingLine = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  return jumpingLine ? '\n' + (0, _reactDecompiler.formatted)(value) + '\n' : (0, _reactDecompiler.formatted)(value);
};

var patchJasmine = function patchJasmine(jasmine) {
  return jasmine.pp = formatReactComponents(jasmine.pp);
};

var install = patchJasmine;
exports.install = install;
exports['default'] = { install: patchJasmine };
