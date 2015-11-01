import {isElement as isReact} from 'react-addons-test-utils';
import {formatted as reactFormatter} from 'react-decompiler';

const formatReactComponents = (defaultFormatter, jumpingLine) => (value) => {
  if (Array.isArray(value) && value.some(isReact)) {
    return formatReactArray(defaultFormatter)(value)
  }

  if (isReact(value)) {
    return formatReactValue(value, jumpingLine);
  }

  return defaultFormatter(value);
}

const formatReactArray = (defaultFormatter) => (array) =>
  `[\n  ${array.map(formatReactComponents(defaultFormatter, false)).join(',\n  ')}\n]`;

const formatReactValue = (value, jumpingLine = true) =>
  jumpingLine ? `\n${reactFormatter(value)}\n` : reactFormatter(value);

const patchJasmine = (jasmine) =>
  jasmine.pp = formatReactComponents(jasmine.pp);

export const install = patchJasmine;
export default {install: patchJasmine};
