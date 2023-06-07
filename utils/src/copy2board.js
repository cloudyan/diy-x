// 复制内容到剪贴板
export function copy2board(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return true
  }
  document.body.removeChild(element)
  return false
}

// 如果复制成功返回true
// copy2board('lalallala')

// 原理：
// - 创建一个textare元素并调用select()方法选中
// - document.execCommand('copy')方法，拷贝当前选中内容到剪贴板。
