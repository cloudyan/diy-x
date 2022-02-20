import axios from 'axios'

// JSONP 核心原理：
// script 标签不受同源策略约束，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于 GET 请求；

axios.jsonp = jsonp
const stringify = (params) => {
  const res = [];
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      if (typeof params[key] !== 'undefined') {
        res.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      }
    }
  }
  return res.join('&')
}

// simple
function jsonp({url, params, callbackName}) {
  if (!url) {
    console.error('请输入 url')
    return
  }

  return new Promise((resolve, reject) => {
    const jsNode = document.createElement('script')
    // JSONP.type = 'text/javascript'
    jsNode.src = `${url}?${stringify(params)}&callback=${callbackName}`

    // 触发callback，触发后删除js标签和绑定在window上的callback
    window[callbackName] = data => {
      resolve(data)
      document.body.removeChild(jsNode)
    }
    // js 加载异常的情况
    jsNode.addEventListener('error', () => {
      delete window[callbackName]
      document.body.removeChild(jsNode)
      reject('JavaScript 资源加载失败')
    }, false)

    // 添加 js 节点，开始请求
    document.body.appendChild(jsNode)
  })
}


// example

// 百度
/**
 * 百度地图根据经纬度拿到地点信息
 * see https://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding
 * http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
 * @params ak String
 * @params location={{lat}},{{lng}}
 * @params output=json
 * TIP: https://api.map.baidu.com/geocoder/v2/ 此接口不支持跨域，只能使用 jsonp 调用
 */

const BAIDU_MAP_AK = ''
function geoToCode(pos) {
  const { coords } = pos
  if (typeof coords.latitude === 'undefined') {
    return new Promise((resolve, reject) => {
      reject(pos)
    })
  }
  const params = {
    ak: BAIDU_MAP_AK,
    location: coords.latitude + ',' + coords.longitude,
    coord_type: 'gcj02',
    output: 'json',
    s: 1,
  }
  const url = 'https://api.map.baidu.com/geocoder/v2/'
  return jsonp(url + '?' + stringify(params)).then(res => {
    console.log(JSON.stringify(res, null, 2))
    // const { result } = res
    // const {
    //   cityCode = '', // 城市code
    //   province = '', // 省
    //   city = '',     // 市
    //   district = '', // 区
    //   street = '',   // 路
    //   street_number = '', // 号
    // } = result.addressComponent

    // const geoInfo = {
    //   type: 'baidu',
    //   citycode: result.cityCode,
    //   name: city.replace('市', ''),
    //   address: (district + street + street_number) || result.formatted_address,
    //   lat: result.location.lat,
    //   lng: result.location.lng,
    // }
    // // console.log('jsonp geoToCode', geoInfo, result)
    // return geoInfo
  })

  // 高德 待定
  // return axios({
  //   url: 'https://restapi.amap.com/v3/geocode/regeo',
  //   method: 'GET',
  //   withCredentials: false,
  //   params: {
  //     key: GD_MAP_AK,
  //     location: coords.longitude + ',' + coords.latitude,
  //     output: 'json',
  //   },
  // }).then(res => {
  //   return res.data
  // })
}
