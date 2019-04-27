import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _035c94af = () => interopDefault(import('../pages/example.vue' /* webpackChunkName: "pages/example" */))
const _a3478152 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _2ffba89a = () => interopDefault(import('../pages/index/index.vue' /* webpackChunkName: "pages/index/index" */))
const _e8c12774 = () => interopDefault(import('../pages/index/about-us.vue' /* webpackChunkName: "pages/index/about-us" */))
const _a0e8abb6 = () => interopDefault(import('../pages/index/articles.vue' /* webpackChunkName: "pages/index/articles" */))
const _0b7a4f95 = () => interopDefault(import('../pages/index/empty.vue' /* webpackChunkName: "pages/index/empty" */))
const _6de8c91b = () => interopDefault(import('../pages/index/article-detail/_id.vue' /* webpackChunkName: "pages/index/article-detail/_id" */))
const _2faf0982 = () => interopDefault(import('../pages/index/_id.vue' /* webpackChunkName: "pages/index/_id" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
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
      component: _035c94af,
      name: "example"
    }, {
      path: "/",
      component: _a3478152,
      children: [{
        path: "",
        component: _2ffba89a,
        name: "index"
      }, {
        path: "about-us",
        component: _e8c12774,
        name: "index-about-us"
      }, {
        path: "articles",
        component: _a0e8abb6,
        name: "index-articles"
      }, {
        path: "empty",
        component: _0b7a4f95,
        name: "index-empty"
      }, {
        path: "article-detail/:id?",
        component: _6de8c91b,
        name: "index-article-detail-id"
      }, {
        path: ":id",
        component: _2faf0982,
        name: "index-id"
      }]
    }],

    fallback: false
  })
}
