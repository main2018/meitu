import request from '~/utils/request'

export function getArticleByCategory(category) {
  return request({
    url: 'album/findByCategory',
    method: 'post',
    data: {
      category,
      status: 0,
    }
  })
}

export function getArticleByCategory(id) {
  return request({
    url: `album/${id}`,
    method: 'get',
  })
}