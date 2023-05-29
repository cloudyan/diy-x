// plugin-1.js
console.log('plugin-1 loaded');
function apply(hook) {
  hook('onCreate', function(ctx) {
    console.log('plugin-1 onCreate');
    console.log(ctx);
  });
  hook('onStart', function(ctx) {
    console.log('plugin-1 onStart');
    console.log(ctx);
  });
}

module.exports = {
  apply
};
