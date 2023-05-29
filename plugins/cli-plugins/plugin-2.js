// plugin-2.js
console.log('plugin-2 loaded');
function apply(hook) {
  hook('onCreate', function(ctx) {
    console.log('plugin-2 onCreate');
    console.log(ctx);
  });
}

module.exports = {
  apply
};
