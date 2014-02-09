var createNodeElement = require('./../src/node');

describe('Node', function () {

  beforeEach(function () {
  });

  it('should create a <div> element', function () {
    var div = createNodeElement('div').render();
    expect(div.tagName).toBe('DIV');
    expect(div.innerHTML).toBe('');
  });

  it('should create a <div> element with text', function () {
    var div = createNodeElement('div')('this is content').render();
    expect(div.innerHTML).toBe('this is content');
  });

  it('should create a nested structure of <ul> with multiple <li>s', function () {
    var ul = createNodeElement('ul'),
        li = createNodeElement('li'),
        fragment;

    fragment = ul(li('one'), li('two'), li('three')).render();
    expect(fragment.childNodes.length).toBe(3);
  });

  it('should create an <input> tag of type password', function () {
    var input = createNodeElement('input').attributes({type: 'password'}).render();
    expect(input.tagName).toBe('INPUT');
    expect(input.type).toBe('password');
  });

});
