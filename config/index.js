const isProduction = process.env.NODE_ENV === 'production'

const API_URL = isProduction ? 'http://112.74.47.86:3000/' : 'http://192.168.0.106:3000/' // 后端api地址

export {
  API_URL,
  isProduction,
}
