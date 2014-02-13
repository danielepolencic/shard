var createNodeElement = require('./src/node'),
    util = require('./src/util')
    tags = {};

[
  'html', 'head', 'title', 'base', 'link', 'meta', 'style', 'script',
  'noscript', 'body', 'body', 'section', 'nav', 'article', 'aside', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'h1', 'h6', 'header', 'footer', 'address', 'main',
  'main', 'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd',
  'dd', 'figure', 'figcaption', 'div', 'a', 'em', 'strong', 'small', 's',
  'cite', 'q', 'dfn', 'abbr', 'data', 'time', 'code', 'var', 'samp', 'kbd',
  'sub', 'sup', 'i', 'b', 'u', 'mark', 'ruby', 'rt', 'rp', 'bdi', 'bdo',
  'span', 'br', 'wbr', 'ins', 'del', 'img', 'iframe', 'embed', 'object',
  'param', 'object', 'video', 'audio', 'source', 'video', 'audio', 'track',
  'video', 'audio', 'canvas', 'map', 'area', 'area', 'map', 'svg', 'math',
  'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td',
  'th', 'form', 'fieldset', 'legend', 'fieldset', 'label', 'input', 'button',
  'select', 'datalist', 'optgroup', 'option', 'select', 'datalist', 'textarea',
  'keygen', 'output', 'progress', 'meter', 'details', 'summary', 'details',
  'menuitem', 'menu'
].forEach(function (tagName) {
  tags[tagName] = createNodeElement(tagName);
});

var compile = function (func) {
  return function () {
    return func.apply(null, [tags].concat(util.toArray(arguments)));
  };
};

var registerNodeElement = function (tagName, func) {
  tags[tagName] = function () {
    return func.apply(null, [tags].concat(util.toArray(arguments)));
  }
};

module.exports = window.Shard = {compile: compile, registerElement: registerNodeElement, tags: tags};
