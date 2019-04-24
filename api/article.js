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

export function getArticle(id) {
  return request({
    url: `album/${id}`,
    method: 'get',
  })
}

export function getArticles() {
  return request({
    url: `album`,
    method: 'get',
  })
}
