import axios from 'axios'
import { Message, Loading } from 'element-ui'
// import qs from 'qs'
import { API_URL } from '~/config/index'
// import store from '@/store'

const API_PREFIX = '/api/'

const isClient = process.client

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: isClient ? API_PREFIX : API_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config.baseURL + config.url, 'isClient:', isClient)
    // console.log('isClient', isClient)
    // const baseURL = `${isClient ? API_PREFIX : API_URL}`
    // console.log('baseURL', baseURL)
    // service.defaults.baseURL = baseURL

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    if (!res.success) {
      Message({
        message: res.message || '网络忙，请稍后再试',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res.message || 'error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '网络忙，请稍后再试' || error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

