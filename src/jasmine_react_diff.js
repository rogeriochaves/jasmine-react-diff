import {isElement as isReact} from 'react-addons-test-utils';
import {formatted as reactFormatter} from 'react-decompiler';

const formatReactComponents = (defaultFormatter) => (value) =>
  isReact(value) ? `\n${reactFormatter(value)}\n` : defaultFormatter(value);

const patchJasmine = (jasmine) =>
  jasmine.pp = formatReactComponents(jasmine.pp);

export const install = patchJasmine;
export default {install: patchJasmine};
