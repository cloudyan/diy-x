
$http = {
  get(data) {

  },
  post(data) {

  },
}

const encryptv1 = function encode(data) {
  return encodeURIComponent(data);
}

function Chain(defer) {
  this.defer = defer;
  return this;
}

// encrypt
function Chain(defer) {
  this.defer = defer;
  return this;
}

['post', 'put'].forEach((method) => {
  Chain.prototype[method] = function (endpoint) {
    return this.defer.then(cmd => $http[method](endpoint, cmd));
  };
});

$http.encryptv1 = function (data) {
  return new Chain(encryptv1(data));
};

export default $http
