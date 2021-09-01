
let version = 0;
let lastVersion;
let lastSnapshot;
const listeners = new Set();

const p = new Proxy({}, {
  set(target, prop, value) {
    ++version;
    target[prop] = value;
    listeners.forEach((listener) => listener());
  },
});

const snapshot = () => {
  if (lastVersion !== version) {
    lastVersion = version;
    lastSnapshot = { ...p };
  }
  return lastSnapshot;
};

const subscribe = (callback) => {
  listeners.add(callback);
  const unsubscribe = () => listeners.delete(callback);
  return unsubscribe;
};

subscribe(() => {
  console.log('mutated!');
});

p.a = 10; // shows "mutated!"
console.log(snapshot());  // ---> { a: 10 }
p.b = 20; // shows "mutated!"
console.log(snapshot()); // ---> { a: 10, b: 20 }
