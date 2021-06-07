
var a = (data = {}) => {
  return new Promise((resolve, reject) => {
    console.log('a', data)
    data.a = 1
    resolve(data)
  })
}
var b = (data = {}) => {
  return new Promise((resolve, reject) => {
    console.log('b', data)
    data.b = 1
    resolve(data)
  })
}
var c = (data = {}) => {
  return new Promise((resolve, reject) => {
    console.log('c', data)
    data.c = 1
    resolve(data)
  })
}
var d = (data = {}) => {
  return new Promise((resolve, reject) => {
    console.log('d', data)
    resolve(data)
  })
}

Promise.all([a(),b().then(c)]).then(d).then(res => {
  console.log(res)
})

// Promise.all([getCityList, browserGeo.then(geoToCode)]).then(getIqgCity)

Promise.all([
  getCityList(),
  browserGeo().then(geoToCode),
]).then(filterCity)

function getCityList() {
  return new Promise((resolve, reject) => {
    // if (cityList)
    const cityList = []
    resolve(cityList)
  })
}
function browserGeo() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          resolve && resolve(res)
        },
        err => {
          // err.code 1无权限使用定位 2无法确定设备位置 3超时
          reject && reject(err)
        },
        {
          enableHighAcuracy: true, // 是否要求高精度的地理位置信息
          timeout: 10000, // 对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
          maximumAge: 60 * 15 * 1000, // 设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
        })
    } else {
      // "对不起，您的浏览器不支持定位功能", //Sorry, browser does not support geolocation!
      reject && reject({
        code: -1,
        message: '对不起，您的浏览器不支持定位功能',
      })
    }
  })
}
function geoToCode(pos) {
  const { coords } = pos
  return axios({
    url: 'https://restapi.amap.com/v3/geocode/regeo',
    method: 'GET',
    withCredentials: false,
    params: {
      key: GD_MAP_AK,
      location: coords.longitude + ',' + coords.latitude,
      output: 'json',
    },
  })
}

function filterCity([cityList, geoInfo]) {
  return new Promise((resolve, reject) => {

  })
}
