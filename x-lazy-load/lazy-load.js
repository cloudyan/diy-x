
// lazy-load iframe

// create a new Intersection Observer
let observer = new IntersectionObserver(callback);

// the element that you want to watch
// const element = document.querySelector('iframe');

// register the element with the observe method
// observer.observe(element);

let observer = new IntersectionObserver(function (entries, observer) {
  // entries.forEach(entry => {
  //   console.log(entry.target);
  //   console.log(entry.isIntersecting);
  // });

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // do this when the element enters the viewport
      loadElement(entry.target);
      // stop watching
      observer.unobserve(entry.target);
    }
  });
});

function loadElement(element) {
  const src = element.getAttribute('data-src');
  element.src = src;
}
