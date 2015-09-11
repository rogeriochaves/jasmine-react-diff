import React from 'react/addons';
import {formatted as reactFormatter} from 'react-decompiler';

const isReact = React.addons.TestUtils.isElement;

const formatReactComponents = (defaultFormatter) => (value) =>
  isReact(value) ? `\n${reactFormatter(value)}\n` : defaultFormatter(value);

const patchJasmine = (jasmine) =>
  jasmine.pp = formatReactComponents(jasmine.pp);

export const install = patchJasmine;
export default {install: patchJasmine};
