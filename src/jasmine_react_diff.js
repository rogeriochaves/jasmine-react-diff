import {isElement as isReact} from 'react-addons-test-utils';
import {formatted as reactFormatter} from 'react-decompiler';

const formatReactComponentsWithFallback = (defaultFormatter, jumpingLine, seen = [], deepness = 1) => (value) => {
  try {
    return formatReactComponents(defaultFormatter, jumpingLine, seen, deepness)(value);
  } catch (ex) {
    console.warn(`jasmineReactDiff: Exception while trying to format react components: ${ex}. Falling back to jasmine default formatter.`)
    return defaultFormatter(value);
  }
};

const formatReactComponents = (defaultFormatter, jumpingLine, seen, deepness) => (value) => {
  if (seen.indexOf(value) > -1) {
    return '[Circular]';
  }

  if (Array.isArray(value) && value.some(isReact)) {
    return formatReactArray(defaultFormatter, seen.concat([value]), deepness)(value);
  }

  if (typeof value === 'object' && !Array.isArray(value) && value !== null && hasAnyReactValues(value)) {
    return formatReactObject(defaultFormatter, seen.concat([value]), deepness)(value);
  }

  if (isReact(value)) {
    return formatReactValue(value, jumpingLine);
  }

  return defaultFormatter(value);
}

const formatReactArray = (defaultFormatter, seen, deepness) => (array) =>
  `[
${indentation(deepness)}${array.map(formatReactComponentsWithFallback(defaultFormatter, false, seen, deepness + 1)).join(`,\n${indentation(deepness)}`)}
${indentation(deepness - 1)}]`;

const hasAnyReactValues = (object) => {
  for (let key in object) {
    if (isReact(object[key])) return true;
  }
  return false;
}

const formatReactObject = (defaultFormatter, seen, deepness) => (object) => {
  let formatedItems = [];

  for (let key in object) {
    formatedItems.push(`${key}: ${formatReactComponentsWithFallback(defaultFormatter, false, seen, deepness + 1)(object[key])}`);
  }
  return `{
${indentation(deepness)}${formatedItems.join(`,\n${indentation(deepness)}`)}
${indentation(deepness - 1)}}`;
}

const indentation = (deepness) =>
  (new Array(deepness + 1)).join('  ');

const formatReactValue = (value, jumpingLine = true) =>
  jumpingLine ? `\n${reactFormatter(value)}\n` : reactFormatter(value);

const patchJasmine = (jasmine) =>
  jasmine.pp = formatReactComponentsWithFallback(jasmine.pp);

export const install = patchJasmine;
export default {install: patchJasmine};
