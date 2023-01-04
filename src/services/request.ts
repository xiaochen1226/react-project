import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import { message } from 'antd'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

// 请求拦截
instance.interceptors.request.use((config) => {
  // 发送网络请求时，在界面的中间未知显示loading的组件
  // 某一些请求需要用户必须携带token，如果没有携带，那么直接跳转到登录界面(router)
  // params/data序列化操作
  return config
})
// 响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && err.response) {
      message.error(err.response.data)
    }
    return Promise.reject(err)
  }
)

export default instance
