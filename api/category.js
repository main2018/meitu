import request from '~/utils/request'

export function getCategorys() {
  return request({
    url: 'category/findAll',
    method: 'get',
    // params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

