// 实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式

const dom2json = (rootDom) => {
  if (!rootDom) {
    return
  }

  let rootObj = {
    tagName: rootDom.tagName,
    children: [],
  }

  const children = rootDom.children
  // 读取子节点（元素节点）
  if (children && children.length) {
    Array.from(children).forEach((ele, i) => {
      // 递归处理
      rootObj.children[i] = dom2json(ele)
    })
  }

  return rootObj
}
