# Shard
Declarative DOM construction.

```javascript
var mytemplate = Shard.compile(function (tags, data) {
  return tags.div(
    tags.h1(data.title),
    tags.p(data.description),

    tags.ul(data.items.map(function (item) {
      return tags.li(item);
    }))
  );
});

var content = mytemplate({
  title: 'Shard.js',
  description: 'Makes it easy to generate HTML in your JavaScript projects.',
  items: [
    'just pure js',
    'build DOM fragments',
    'lightweight'
  ]
});

document.getElementsByTagName('body')[0].appendChild(content.render());
```

output:

```html
<div>
  <h1>Shard.js</h1>
  <p>Makes it easy to generate HTML in your JavaScript projects.</p>
  <ul>
    <li>just pure js</li>
    <li>build DOM fragments</li>
    <li>lightweight</li>
  </ul>
</div>
```

## Usage
Shard exposes itself as a global variable in the browser. To compile a template,
you can use the `compile` method as below:

```javascript
Shard.compile(function (tags) {
  /* your template /*
});
```

The first argument of the anonymous function is always a collection of HTML
tags. All the argument passed to the newly generated compile function are
injected in the anynoumous function:

```javascript
var template = Shard.compile(function (tags, arg1, arg2, arg3) {
  /* your template /*
});

template(arg1, arg2, arg3);
```

It's important that the template function always returns a valid HTML fragment:

```javascript
// bad
Shard.compile(function (tags) {
  tags.div('Hello');
});

// good
Shard.compile(function (tags) {
  return tags.div('Hello');
});
```

Call the `render` method when you want to get an HTML representation of your
template:

```javascript
var template = Shard.compile(function (tags) {
  return tags.div('Hello');
});
template().render(); // div fragment
```

### DOM elements
As mentioned previosuly, the first argument for the compile function is always
a collection of HTML tags. A tag is just a function with some convenient method
attached:

```javascript
var template = Shard.compile(function (tags) {
  return tags.div(
    tags.input().attrs({type: 'password'});
  );
});

template().render();
```

generates:

```html
<div><input type="password"></div>
```

### Helpers
Shard use javascript to create a template. Therefore you can use the power of
javascript to create helpers:

```javascript
Shard.compile(function (tags, data) {
  return tags.div(data.name.length < 10 ? data.name.toLowerCase() : 'too short');
})({
  name: 'Shard'
});
```

### Nesting templates
Templates can be easily nested in other templates:

```javascript
var commentBox = Shard.compile(function (tags, data) {
  return tags.div(
   tags.h2(data.name),
   tags.p(data.description)
  )
});

var list = Shard.compile(function (tags, data) {
  return tags.div(
    h1(data.title),
    tags.ul(
      data.comments.map(function (comment) {
        return tags.li(commentBox(comment));
      })
    )
  );
});

list({
  title: 'Comments',
  comments: [
    {name: 'Daniele', description: 'This is Shard'},
    {name: 'Shard', description: 'Yes, I know'}
  ]
}).render();
```
