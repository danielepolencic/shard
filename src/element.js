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
