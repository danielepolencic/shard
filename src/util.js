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

