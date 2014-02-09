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
          return Object.keys(arg).forEach(function (name) {
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
