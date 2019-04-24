import request from '~/utils/request'

export function getAbout() {
  return request({
    url: '/about',
    method: 'get'
  })
}

export function getSite() {
  return request({
    url: '/site',
    method: 'get'
  })
}
