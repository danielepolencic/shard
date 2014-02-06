if (!Object.assign) {
  Object.assign = function (target, source) {
    return Object.keys(source).reduce(function(target, key) {
      target[key] = source[key];
      return target;
    }, target);
  };
}

var tags = {};
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
].map(function (name) {
  tags[name] = function () {
    var args = [].slice.call(arguments);
    return function () {
      var element = document.createElement(name);
      args.forEach(function (arg) {
        if (Object.prototype.toString.call(arg) === '[object Array]') {
          arg.forEach(function (item) {
            element.appendChild(item());
          });
        }
        if (Object.prototype.toString.call(arg) === '[object Function]') {
          element.appendChild(arg());
        }
        if (Object.prototype.toString.call(arg) === '[object String]' || Object.prototype.toString.call(arg) === '[object Number]') {
          element.appendChild(document.createTextNode(arg));
        }
      });
      return element;
    }
  };
});

function template (template) {
  return function (data) {
    return Function(
              "with (this) {" +
                "return(" +
                  "(function(){" + template.toString().replace(/^function.*?{/gi, '').replace(/}$/gi, '') + "})()" +
                ");" +
              "};"
            ).apply(Object.assign(tags, data || {}));
  }
}

var myTemplate = template(function () {

  return div(
    h1(Title),
    p(Description),
    br(),

    ul(
      Collection.map(function (item) {
        return li(item);
      })
    )
  );

})({
  Title: 'this is my title',
  Description: 'hello how are you doing',
  Collection: ['one', 'two', 'three']
});
