document.addEventListener('click', function (clickEvent) {
  let target = clickEvent.target;
  readXPath(target);
});
function readXPath(el) {
  // jq路径
  // if (!el) {
  //     return;
  // }
  // let stack = [];
  // let isShadow = false;
  // while (el.parentNode != null) {
  //     let sibCount = 0;
  //     let sibIndex = 0;
  //     for ( let i = 0; i < el.parentNode.childNodes.length; i++ ) {
  //         let sib = el.parentNode.childNodes[i];
  //         if ( sib.nodeName === el.nodeName ) {
  //             if ( sib === el ) {
  //                 sibIndex = sibCount;
  //             }
  //             sibIndex = sibCount;
  //             sibCount++;
  //         }
  //     }
  //     let nodeName = el.nodeName.toLowerCase();
  //     if (isShadow) {
  //         nodeName += "::shadow";
  //         isShadow = false;
  //     }
  //     if ( sibCount > 1 ) {
  //         stack.unshift(nodeName + ':eq(' + (sibIndex + 1) + ')');
  //     } else {
  //         stack.unshift(nodeName);
  //     }
  //     el = el.parentNode;
  //     if (el.nodeType === 11) {
  //         isShadow = true;
  //         el = el.host;
  //     }
  // }
  // return stack.join(' > ');

  // 标准CSS路径
  if (!(el instanceof Element)) return;
  let path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += '#' + el.id;
      path.unshift(selector);
      break;
    } else {
      let sib = el,
        nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() == selector) nth++;
      }
      if (nth != 1) selector += ':nth-of-type(' + nth + ')';
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(' > ');
}

// 相同路径获取 dom
// 比如某元素第二个子元素下第一个子元素
export function findDom(realWrapper, clonedWrapper, target) {
  const xpath = getXPathByDom(target, clonedWrapper);
  return getDomByXPath(realWrapper, xpath);
}

function getChildNum(child) {
  let i = 0;
  while ((child = child.previousSibling) != null) i++;
  return i;
}

function getChildDom(parentNode, index) {
  return parentNode.children[index];
}

function getXPathByDom(el, root = null) {
  let stack = [];
  while (el.parentNode != null) {
    stack.push(getChildNum(el));
  }
  return stack;
}

function getDomByXPath(el, xpath = []) {
  let node = el;
  for (let i = 0; i < xpath.length; i++) {
    node = getChildDom(el, xpath[i]);
  }
  return node;
}
