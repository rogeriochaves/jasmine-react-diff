'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactDecompiler = require('react-decompiler');

var formatReactComponents = function formatReactComponents(defaultFormatter, jumpingLine) {
  var seen = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
  return function (value) {
    if (seen.indexOf(value) > -1) {
      return '[Circular]';
    }
    seen.push(value);

    if (Array.isArray(value) && value.some(_reactAddonsTestUtils.isElement)) {
      return formatReactArray(defaultFormatter, seen)(value);
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null && hasAnyReactValues(value)) {
      return formatReactObject(defaultFormatter, seen)(value);
    }

    if ((0, _reactAddonsTestUtils.isElement)(value)) {
      return formatReactValue(value, jumpingLine);
    }

    return defaultFormatter(value);
  };
};

var formatReactArray = function formatReactArray(defaultFormatter, seen) {
  return function (array) {
    return '[\n  ' + array.map(formatReactComponents(defaultFormatter, false, seen)).join(',\n  ') + '\n]';
  };
};

var hasAnyReactValues = function hasAnyReactValues(object) {
  for (var key in object) {
    if ((0, _reactAddonsTestUtils.isElement)(object[key])) return true;
  }
  return false;
};

var formatReactObject = function formatReactObject(defaultFormatter, seen) {
  return function (object) {
    var formatedItems = [];

    for (var key in object) {
      formatedItems.push(key + ': ' + formatReactComponents(defaultFormatter, false, seen)(object[key]));
    }
    return '{\n  ' + formatedItems.join(',\n  ') + '\n}';
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
