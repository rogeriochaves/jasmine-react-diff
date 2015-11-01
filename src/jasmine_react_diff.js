import {isElement as isReact} from 'react-addons-test-utils';
import {formatted as reactFormatter} from 'react-decompiler';

const formatReactComponents = (defaultFormatter, jumpingLine, seen = []) => (value) => {
  if (seen.indexOf(value) > -1) {
    return '[Circular]';
  }
  seen.push(value);

  if (Array.isArray(value) && value.some(isReact)) {
    return formatReactArray(defaultFormatter, seen)(value);
  }

  if (typeof value === 'object' && !Array.isArray(value) && value !== null && hasAnyReactValues(value)) {
    return formatReactObject(defaultFormatter, seen)(value);
  }

  if (isReact(value)) {
    return formatReactValue(value, jumpingLine);
  }

  return defaultFormatter(value);
}

const formatReactArray = (defaultFormatter, seen) => (array) =>
  `[\n  ${array.map(formatReactComponents(defaultFormatter, false, seen)).join(',\n  ')}\n]`;

const hasAnyReactValues = (object) => {
  for (let key in object) {
    if (isReact(object[key])) return true;
  }
  return false;
}

const formatReactObject = (defaultFormatter, seen) => (object) => {
  let formatedItems = [];

  for (let key in object) {
    formatedItems.push(`${key}: ${formatReactComponents(defaultFormatter, false, seen)(object[key])}`);
  }
  return `{\n  ${formatedItems.join(',\n  ')}\n}`;
}

const formatReactValue = (value, jumpingLine = true) =>
  jumpingLine ? `\n${reactFormatter(value)}\n` : reactFormatter(value);

const patchJasmine = (jasmine) =>
  jasmine.pp = formatReactComponents(jasmine.pp);

export const install = patchJasmine;
export default {install: patchJasmine};
