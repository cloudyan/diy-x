// 数组随机排序
//    随机抽奖?

function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1
}

// test
let arr = [2, 3, 1, 2, 3, 4, 5, 6, 454, 34, 324, 32]
arr.sort(randomSort)
console.log(arr)
