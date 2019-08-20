import Vue from 'vue'
import 'es6-promise/auto' // 解决IE9以下版本不支持promise的问题
import 'lib-flexible/flexible' // 淘宝弹性布局
import App from './App.vue'
import Vant, { Notify, Dialog } from 'vant'
import 'vant/lib/index.css'
// import './assets/css/main.css';
import './assets/css/index.scss'
import common from './utils/common.js'
import '@babel/polyfill'
import axios from './api/ajax.js'
import router from './router/router.js'
import store from './store/index.js'
import Mui from 'vue-awesome-mui'
import echarts from 'echarts'
import md5 from 'js-md5'
import './assets/font/iconfont.css'
import '@/assets/font/iconfont.js'
import './filter/filters.js'
Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(Notify)
Vue.use(Dialog)
Vue.use(Mui)
;(function() {
  // IOS微信端输入框问题
  let timer
  document.body.addEventListener('focusin', _ => {
    clearTimeout(timer)
  })
  document.body.addEventListener('focusout', _ => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      window.scrollTo(0, document.body.scrollTop + 1)
      document.body.scrollTop >= 1 &&
        window.scrollTo(0, document.body.scrollTop - 1)
    }, 10)
  })
})()

Vue.prototype.Notify = Notify
Vue.prototype.Dialog = Dialog
Vue.prototype.$ajax = axios
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts
Vue.prototype.$common = common
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
