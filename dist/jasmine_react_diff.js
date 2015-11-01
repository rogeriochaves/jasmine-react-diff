'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactDecompiler = require('react-decompiler');

var formatReactComponents = function formatReactComponents(defaultFormatter, jumpingLine) {
  var seen = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
  var deepness = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
  return function (value) {
    if (seen.indexOf(value) > -1) {
      return '[Circular]';
    }

    if (Array.isArray(value) && value.some(_reactAddonsTestUtils.isElement)) {
      return formatReactArray(defaultFormatter, seen.concat([value]), deepness)(value);
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null && hasAnyReactValues(value)) {
      return formatReactObject(defaultFormatter, seen.concat([value]), deepness)(value);
    }

    if ((0, _reactAddonsTestUtils.isElement)(value)) {
      return formatReactValue(value, jumpingLine);
    }

    return defaultFormatter(value);
  };
};

var formatReactArray = function formatReactArray(defaultFormatter, seen, deepness) {
  return function (array) {
    return '[\n' + indentation(deepness) + array.map(formatReactComponents(defaultFormatter, false, seen, deepness + 1)).join(',\n' + indentation(deepness)) + '\n' + indentation(deepness - 1) + ']';
  };
};

var hasAnyReactValues = function hasAnyReactValues(object) {
  for (var key in object) {
    if ((0, _reactAddonsTestUtils.isElement)(object[key])) return true;
  }
  return false;
};

var formatReactObject = function formatReactObject(defaultFormatter, seen, deepness) {
  return function (object) {
    var formatedItems = [];

    for (var key in object) {
      formatedItems.push(key + ': ' + formatReactComponents(defaultFormatter, false, seen, deepness + 1)(object[key]));
    }
    return '{\n' + indentation(deepness) + formatedItems.join(',\n' + indentation(deepness)) + '\n' + indentation(deepness - 1) + '}';
  };
};

var indentation = function indentation(deepness) {
  return new Array(deepness + 1).join('  ');
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
