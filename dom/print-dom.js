/**
 * 逐层打印 DOM树 的根节点及其子元素，打印的格式为 `tagName#id`，如果 id 为空只需要打印 tagName。
 *
 * 例如下面的 HTML：
 * `
 * <body>
 *    <div id="d1">
 *        <div id="d4"></div>
 *        <div id="d5">
 *            <div id="d8"></div>
 *        </div>
 *    </div>
 *    <div id="d2">
 *        <div id="d6">
 *            <div id="d9"></div>
 *        </div>
 *    </div>
 *    <div id="d3">
 *        <div id="d7"></div>
 *    </div>
 * </body>
 * `
 * 如果将body元素作为根节点传入此函数，那么
 * 第一层为 body 元素；
 * 第二层为 div#d1, div#d2, div#d3；
 * 第三层为 div#d4, div#d5, div#d6, div#d7；
 * 第四层为 div#d8, div#d9；
 *
 * 最终打印出来的结果应该为：
 * `body, div#d1, div#d2, div#d3, div#d4, div#d5, div#d6, div#d7, div#d8, div#d9`
 *
 * @param root DOM 树的根节点
 */
function printDomTreeByLevelOrder(root) {
  let nodeArr = [root]
  function fn(nodeArr) {
    while (nodeArr.length > 0) {
      const node = nodeArr.shift(nodeArr)
      console.log(node.tagName + (node.id ? `#${node.id}` : ''))
      for (const child of node.children) {
        nodeArr.push(child)
      }
    }
  }
  fn(nodeArr)
}

const node = document.createElement('div')
node.innerHTML = `
  <div id="d1">
    <div id="d4"></div>
    <div id="d5">
      <div id="d8"></div>
    </div>
  </div>
  <div id="d2">
    <div id="d6">
      <div id="d9"></div>
    </div>
  </div>
  <div id="d3">
    <div id="d7"></div>
  </div>
`

printDomTreeByLevelOrder(node)

// output:
// DIV
// DIV#d1
// DIV#d2
// DIV#d3
// DIV#d4
// DIV#d5
// DIV#d6
// DIV#d7
// DIV#d8
// DIV#d9
