import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _2ae09ad4 = () => interopDefault(import('..\\pages\\example.vue' /* webpackChunkName: "pages_example" */))
const _5b058abc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _598b0374 = () => interopDefault(import('..\\pages\\index\\index.vue' /* webpackChunkName: "pages_index_index" */))
const _ce7ab1cc = () => interopDefault(import('..\\pages\\index\\about-us.vue' /* webpackChunkName: "pages_index_about-us" */))
const _86a2360e = () => interopDefault(import('..\\pages\\index\\articles.vue' /* webpackChunkName: "pages_index_articles" */))
const _a28db57e = () => interopDefault(import('..\\pages\\index\\empty.vue' /* webpackChunkName: "pages_index_empty" */))
const _2f87faa6 = () => interopDefault(import('..\\pages\\index\\article-detail\\_id.vue' /* webpackChunkName: "pages_index_article-detail__id" */))
const _15bf5a2e = () => interopDefault(import('..\\pages\\index\\_id.vue' /* webpackChunkName: "pages_index__id" */))

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/example",
      component: _2ae09ad4,
      name: "example"
    }, {
      path: "/",
      component: _5b058abc,
      children: [{
        path: "",
        component: _598b0374,
        name: "index"
      }, {
        path: "about-us",
        component: _ce7ab1cc,
        name: "index-about-us"
      }, {
        path: "articles",
        component: _86a2360e,
        name: "index-articles"
      }, {
        path: "empty",
        component: _a28db57e,
        name: "index-empty"
      }, {
        path: "article-detail/:id?",
        component: _2f87faa6,
        name: "index-article-detail-id"
      }, {
        path: ":id",
        component: _15bf5a2e,
        name: "index-id"
      }]
    }],

    fallback: false
  })
}
