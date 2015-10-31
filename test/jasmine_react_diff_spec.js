import React from 'react/addons';
import reactDiff from 'jasmine_react_diff';

describe('Jasmine React Diff', () => {
  beforeEach(() => reactDiff.install(jasmine));

  describe('jasmine pretty printer', () => {
    it('prints a nicely formated react component', () => {
      let component = (
        <div>
          <h1>Foo</h1>
          <hr key="foo" someProp="bar" />
        </div>
      );

      expect(jasmine.pp(component)).toBe(`
<div>
  <h1>Foo</h1>
  <hr key="foo" someProp="bar" />
</div>
`);
    });

    it('keeps default behaviour for other values', () => {
      let javascriptObject = {a: 5, b: () => {}};

      expect(jasmine.pp(javascriptObject)).toBe('Object({ a: 5, b: Function })');
    });
  });

  // Example spec just to see jasmine output on failing comparisson
  xit('fails with different react components', () => {
    let myComponent = (
      <div>
        <h1>Hello World</h1>
        <hr className="foo" />
      </div>
    );

    let expectedComponent = (
      <div>
        <h1>Foo</h1>
        <hr someProp="bar" />
      </div>
    );

    expect(myComponent).toEqual(expectedComponent);
  });
});
