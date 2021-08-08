import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  err => {
    // if(err.response||err.response.data||err.response.data.code)
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  config => {
    if (config.data.success) {
      return config.data
    } else {
      return Promise.reject(new Error(config.data.message))
    }
  },
  async err => {
    if (err.response || err.response.data || err.response.data.code || err.response.data.code === 10002) {
      await store.dispatch('user/logOut')
      router.push('/login?return_url=' + encodeURIComponent(this.$route.fullPath))
    }
    return Promise.reject(err)
  }
)

export default service
