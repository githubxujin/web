import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import {
  Toast
} from 'vant'
import router from '../router/router.js'
import storages from '../utils/storages.js'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.defaults.timeout = 20000

// console.log('process.env.VUE_APP_API :', process.env.VUE_APP_API)
// axios.defaults.baseURL = process.env.VUE_APP_API; // 打包测试时放开
// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    if (storages.getLocalStorage('$token_info')) {
      config.headers.token = storages.getLocalStorage('$token_info')
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 错误状态码处理提示
class MessageTip extends Vue {
  messageTipInstance = null
  constructor() {
    super()
  }
  static instance(code) {
    if (!this.messageTipInstance) {
      this.messageTipInstance = new MessageTip()
    }
    this.messageTipInstance.errorInfo(code)
  }

  errorInfo(errorCode) {
    // Toast.allowMultiple;
    switch (errorCode) {
      case 400:
        Toast.fail({
          message: '请求错误'
        })
        break
      case 401:
        Toast.fail({
          message: '未授权'
        })
        break
      case 403:
        Toast.fail({
          message: 'token校验失败'
        })
        break
      case 404:
        Toast.fail({
          message: '请求地址出错'
        })

        break
      case 405:
        Toast.fail({
          message: '请求类型出错'
        })
        break
      case 408:
        Toast.fail({
          message: '请求超时'
        })
        break

      case 500:
        Toast.fail({
          message: '服务器内部错误'
        })
        break

      case 501:
        Toast.fail({
          message: '服务器未实现'
        })
        break

      case 502:
        Toast.fail({
          message: '网络错误'
        })
        break

      case 503:
        Toast.fail({
          message: '服务不可用'
        })
        break

      case 504:
        Toast.fail({
          message: '网关超时'
        })
        break

      case 505:
        Toast.fail({
          message: 'HTTP版本不受支持'
        })
        break
    }
  }
}

// 响应拦截器
axios.interceptors.response.use(
  function(response) {
    // console.log(response)
    if (response.data.code == 403) {
      MessageTip.instance(response.data.code)
      storages.removeAllLocalStorage()
      setTimeout(() => {
        router.push({
          path: '/login'
        })
      }, 1000)
    }
    return response.data
  },
  function(error) {
    // console.log(error, error.response.status)
    MessageTip.instance(error.response.status)
    return Promise.reject(error)
  }
)

export default {
  // get请求,参数以表单的形式上传
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param
      })
        .then((res = {}) => {
          if (res.code !== 200) reject(res)
          resolve(res)
        })
        .catch(_ => reject(_))
    })
  },
  // post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(param),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // basePost请求
  basePost(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // post json请求
  postJson(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
