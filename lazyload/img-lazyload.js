
// 图片懒加载
// 根据当前元素的位置和视口进行判断是否要加载这张图片
//    性能优化
//      - 图片全部加载完成后移除事件监听
//      - 加载完的图片，从 imgList 移除，起到优化内存的作用
// https://juejin.cn/post/6844903856489365518#heading-19


let imgList = [...document.querySelectorAll('img')]
let length = imgList.length

const imgLazyLoad = function() {
  let count = 0
  return (function() {
    let deleteIndexList = []
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src
        deleteIndexList.push(index)
        count++
        if (count === length) {
          document.removeEventListener('scroll', imgLazyLoad)
        }
      }
    })
    imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
  })()
}

// 这里最好加上防抖处理
document.addEventListener('scroll', imgLazyLoad)

