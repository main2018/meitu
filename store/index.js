import { getCategorys } from '~/api/category'
import { compare } from '~/utils'
import { log } from 'util';

export const state = () => ({
  currentIndex: -1,
  categorys: [],
  site: {},
})

export const mutations = {
  SET_CURRENT_INDEX(state, currentIndex) {
    state.currentIndex = currentIndex
  },
  SET_CATEGORYS (state, categorys) {
    state.categorys = categorys
  },
  SET_SITE(state, site) {
    state.site = site || {}
  },
}
export const actions = {
  async nuxtServerInit({ commit }, { req, route }) {
    console.log('nuxtServerInit')
    const categorys = await getCategorys()
    commit('SET_CATEGORYS', (categorys || []).sort(compare('order')))
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  }
}
