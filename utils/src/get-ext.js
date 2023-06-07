/**
 * 获取文件后缀名
 * @param {String} filename
 */
export function getExt(filename) {
  if (typeof filename === 'string') {
    return filename.split('.').pop().toLowerCase()
  } else {
    throw new Error('filename must be a string type')
  }
}
