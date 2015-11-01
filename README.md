# jasmine-react-diff [![Build Status][snap-svg]][snap-url]

[snap-svg]: https://snap-ci.com/rogeriochaves/jasmine-react-diff/branch/master/build_image.svg
[snap-url]: https://snap-ci.com/rogeriochaves/jasmine-react-diff/branch/master

Outputs nicely formated jsx when diffing two react components on jasmine, instead of ugly big impossible-to-compare objects.

It uses [react-decompiler](https://github.com/rogeriochaves/react-decompiler) to transform react elements back into jsx.

# How to use it

Install with npm:

```
npm install --save-dev jasmine-react-diff
```

Patch jasmine before running the specs:

```javascript
import reactDiff from 'jasmine-react-diff';

reactDiff.install(jasmine);
```

If you prefer, there is also a browserified version at `dist/browserified.js` that exports the `jasmineReactDiff` global.

# How it looks

For a spec like this:

```javascript
it('fails with different react components', () => {
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
```

*Without* jasmine-react-diff:

```javascript
Expected Object({ type: 'div', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ children: [ Object({ type: 'h1', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ children: 'Hello World' }), originalProps: Object({ children: 'Hello World' }) }) }), Object({ type: 'hr', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ className: 'foo' }), originalProps: Object({ className: 'foo' }) }) }) ] }), originalProps: Object({ children: [ Object({ type: 'h1', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ children: 'Hello World' }), originalProps: Object({ children: 'Hello World' }) }) }), Object({ type: 'hr', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ className: 'foo' }), originalProps: Object({ className: 'foo' }) }) }) ] }) }) }) to equal Object({ type: 'div', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ children: [ Object({ type: 'h1', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ children: 'Foo' }), originalProps: Object({ children: 'Foo' }) }) }), Object({ type: 'hr', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ someProp: 'bar' }), originalProps: Object({ someProp: 'bar' }) }) }) ] }), originalProps: Object({ children: [ Object({ type: 'h1', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ children: 'Foo' }), originalProps: Object({ children: 'Foo' }) }) }), Object({ type: 'hr', key: null, ref: null, _owner: null, _context: Object({  }), _store: Object({ props: Object({ someProp: 'bar' }), originalProps: Object({ someProp: 'bar' }) }) }) ] }) }) }).
```

*With* jasmine-react-diff:

```javascript
Expected 
    <div>
      <h1>Hello World</h1>
      <hr className="foo" />
    </div>
     to equal 
    <div>
      <h1>Foo</h1>
      <hr someProp="bar" />
    </div>
```

Much better, huh?
