/**
 * 对象转化为formdata
 * @param {Object} object
 */

export function getFormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => formData.append(key + `[${i}]`, subValue))
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}

// 使用场景：上传文件时我们要新建一个FormData对象，然后有多少个参数就append多少次，使用该函数可以简化逻辑

// let req={
//   file:xxx,
//   userId:1,
//   phone:'15198763636',
//   //...
// }
// fetch(getFormData(req))
