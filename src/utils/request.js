/*
*基于axios封装的请求模块
*/
import axios from 'axios'
import JSONbig from 'json-bigint'

// axios()
// axios.get()
// axios.post()

// 创建一个axios实例，说白了就是赋值一个axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 最新接口地址
  // baseURL: 'http://ttapi.research.itcast.cn/',  
  // 定义后端返回的原始数据的处理
  // 参数data就是后端返回的原始数据（未经处理的JSON格式字符串）
  transformResponse:[function (data) { //这个是在axiosgithub上看到的粘贴过来的
    // 后端返回的数据可能不是JSON格式字符串
    // 如果不是的话，那么JSONbig.parse调用就会报错
    // 所以使用try-catch来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
    // axios 默认在内部使用JSON.parse来转换处理原始数据
    // return JSON.parse(data)
  }]
  // baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 任何所有请求都会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 如果有登录用户信息，则统一设置token
  // console.log(user)
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  // 然后我们就可以在允许请求出去之前定制统一业务功能处理
  // 例如：统一的设置token

  // 当这里return config之后请求才会真正发出去
  return config
},
// 请求失败，会经过这里
function (error) {
  return Promise.reject(error)
})
// 响应拦截器

// 导出请求方法
export default request

// 谁要使用就加载 request 模块
// import request from 'request.js'
// request({
//     method:{} ,
//     url:''
// })
