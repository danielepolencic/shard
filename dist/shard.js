(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  }
};

module.exports = window.Shard = {compile: compile};

},{"./src/node":3,"./src/util":4}],2:[function(require,module,exports){
function DOMElement (tagName) {
  this.element = document.createElement(tagName);
  return this;
}

DOMElement.prototype.appendChild = function (child) {
  this.element.appendChild(child);
  return this;
};

DOMElement.prototype.appendTextNode = function (text) {
  this.element.appendChild(document.createTextNode(text));
  return this;
};

DOMElement.prototype.setAttribute = function (name, value) {
  this.element.setAttribute(name, value);
  return this;
};

DOMElement.prototype.render = function () {
  return this.element;
};

module.exports = function createElement (tagName) {
  return new DOMElement(tagName);
};

},{}],3:[function(require,module,exports){
var util = require('./util'),
    createElement = require('./element')

module.exports = function createNodeElement (tagName /*, args */) {

  function NodeElement (/*, args */) {

    var args = util.toArray(arguments);

    var nodeWrapper = function nodeWrapper () {
      return NodeElement.apply(null, arguments);
    };

    nodeWrapper.attributes = function (attributes) {
      return NodeElement.apply(null, args.concat([attributes]));
    };

    nodeWrapper.render = function render () {
      var element = createElement(tagName);
      args.forEach(function (arg) {

        if (util.isArray(arg)) {
          return arg.forEach(function (item) {
            element.appendChild(item.render());
          });
        }

        if (util.isFunction(arg)) {
          return element.appendChild(arg.render());
        }

        if (util.isObject(arg)) {
          Object.keys(arg).forEach(function (name) {
            element.setAttribute(name, arg[name]);
          }, this);
        }

        element.appendTextNode(util.toString(arg));

      });
      return element.render();
    };

    return nodeWrapper;
  }

  return NodeElement.apply(null, util.toArray(arguments).slice(1));
}

},{"./element":2,"./util":4}],4:[function(require,module,exports){
var __toString = Object.prototype.toString,
    __slice = Array.prototype.slice;

module.exports = {

  isString: function (value) {
    return __toString.call(value) === '[object String]';
  },

  isArray: function (value) {
    return __toString.call(value) === '[object Array]';
  },

  isNumber: function (value) {
    return __toString.call(value) === '[object Number]';
  },

  isFunction: function (value) {
    return __toString.call(value) === '[object Function]';
  },

  isObject: function (value) {
    return __toString.call(value) === '[object Object]';
  },

  toArray: function (arrayLike) {
    return __slice.call(arrayLike);
  },

  toString: function (anything) {
    var output = '';
    try {
      output = anything.toString();
    } catch (e) {}
    return output;
  }

};


},{}]},{},[1])