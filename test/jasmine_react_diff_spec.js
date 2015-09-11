var React = require('react/addons');
var reactDiff = require('jasmine_react_diff');

describe('Jasmine React Diff', function() {
  beforeEach(function () {
    reactDiff.install(jasmine);
  });

  describe('jasmine pretty printer', function () {
    it('prints a nicely formated react component', function () {
      var component = React.createElement("div", null, React.createElement("h1", null, "Foo"), React.createElement("hr", { someProp: "bar" }) );

      expect(jasmine.pp(component)).toBe('<div>\n\
  <h1>Foo</h1>\n\
  <hr someProp="bar" />\n\
</div>');
    });

    it('keeps default behaviour for other values', function () {
      var javascriptObject = {a: 5, b: function () {}};

      expect(jasmine.pp(javascriptObject)).toBe('Object({ a: 5, b: Function })');
    });
  });

  // Example spec just to see jasmine output on failing comparisson
  xit('fails with different react components', function () {
    var componentUno = React.createElement("div", null, React.createElement("h1", null, "Foo"), React.createElement("hr", { someProp: "bar" }) );
    var componentDuo = React.createElement("div", { className: "something" }, React.createElement("h1", null, "Hello World"), React.createElement("hr", null) );

    expect(componentUno).toEqual(componentDuo);
  });
});
