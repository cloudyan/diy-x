// 手机号分割 3-4-4

// 适合纯11位手机
const splitMobile = (mobile, format = '-') => {
  return String(mobile).replace(/(?=(\d{4})+$)/g, format)
}
// 适合11位以内的分割
const splitMobile2 = (mobile, format = '-') => {
  return String(mobile)
    .replace(/(?<=(\d{3}))/, format)
    .replace(/(?<=([\d\-]{8}))/, format)
}

// testing
console.log(splitMobile(13521332155)) // 135-2133-2155
console.log(splitMobile2(13521332155)) // 135-2133-2155
