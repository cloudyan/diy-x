const arrayToTree = (array) => {
  const hashMap = {}
  let result = []

  array.forEach((it) => {
    const { id, pid } = it

    // 不存在时，先声明children树形
    // 这一步也有可能在下面出现
    if (!hashMap[id]) {
      hashMap[id] = {
        children: [],
      }
    }

    hashMap[id] = {
      ...it,
      children: hashMap[id].children,
    }
    // 处理当前的item
    const treeIt = hashMap[id]

    // 根节点，直接push
    if (pid === 0) {
      result.push(treeIt)
    } else {
      // 也有可能当前节点的父父节点还没有加入hashMap，所以需要单独处理一下
      if (!hashMap[pid]) {
        hashMap[pid] = {
          children: [],
        }
      }
      // 非根节点的话，找到父节点，把自己塞到父节点的children中即可
      hashMap[pid].children.push(treeIt)
    }
  })

  return result
}

// 测试
const data1 = [
  // 注意这里，专门把pid为1的元素放一个在前面
  { id: 2, name: '部门2', pid: 1 },
  { id: 1, name: '部门1', pid: 0 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 7, name: '部门7', pid: 6 },
]

console.log(JSON.stringify(arrayToTree(data1), null, 2))

const tree2list = (tree) => {
  let list = []
  let queue = [...tree]

  while (queue.length) {
    // 从前面开始取出节点
    const node = queue.shift()
    const children = node.children
    // 取出当前节点的子节点，放到队列中，等待下一次循环
    if (children.length) {
      queue.push(...children)
    }
    // 删除多余的children树形
    delete node.children
    // 放入列表
    list.push(node)
  }

  return list
}

// 测试
const data2 = [
  {
    id: 1,
    name: '部门1',
    pid: 0,
    children: [
      {
        id: 2,
        name: '部门2',
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: '部门3',
        pid: 1,
        children: [
          {
            id: 4,
            name: '部门4',
            pid: 3,
            children: [
              {
                id: 5,
                name: '部门5',
                pid: 4,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]

console.log(tree2list(data2))
