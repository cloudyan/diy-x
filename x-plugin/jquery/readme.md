# jQuery

jQuery插件实现机制：就是给原型添加一些功能方法。

```js
(function($) {
  $.fn.popup = function(action) {
    if (action === 'open') {
      // Open popup code.
    }

    if (action === 'close') {
      // Close popup code.
    }
    return this;
  };
}(jQuery));

$('a').popup('open'); // Makes all the links green.
```

- https://learn.jquery.com/plugins/basic-plugin-creation/
