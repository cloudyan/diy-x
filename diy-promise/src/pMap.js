export function pMap(list, mapper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    let currentIndex = 0;
    let result = [];
    let resolveCount = 0;
    let len = list.length;

    function next() {
      const index = currentIndex++;
      Promise.resolve(list[index])
        .then(o => mapper(o, index))
        .then(o => {
          result[index] = o;
          if (++resolveCount === len) { resolve(result) }
          if (currentIndex < len) { next(); }
        })
    }

    for (let i = 0; i < concurrency && i< len; i++) {
      next();
    }
  })
}
